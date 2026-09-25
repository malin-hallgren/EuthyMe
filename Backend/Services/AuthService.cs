using Backend.DTOs.Password;
using Backend.DTOs.User;
using Backend.Models;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration config;

        private readonly IWebHostEnvironment env;


        public AuthService(UserManager<User> _userManager, IConfiguration _config, IWebHostEnvironment _env)
        {
            userManager = _userManager;
            config = _config;
            env = _env;
        }

        public async Task<(HttpStatusCode status, List<string>? errors, string? token, string? role)> AuthenticateUserAsync(LogInUser logInUser)
        {
            var errors = new List<string>();
            var user = await userManager.FindByEmailAsync(logInUser.UserName); //UserName is duplicated from Email
            if (user == null || !await userManager.CheckPasswordAsync(user, logInUser.Password))
            {
                errors.Add("ERR_LOGIN_CRED_400");
                return (HttpStatusCode.BadRequest, errors, null, null);
            }

            var roles = await userManager.GetRolesAsync(user);
            var primaryRole = roles.FirstOrDefault().ToUpper() ?? "USER";

            var token = await GenerateJwtToken(user);

            return (HttpStatusCode.OK, null, token, primaryRole);
        }

        public async Task<string> GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var userRoles = await userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("role", userRoles.FirstOrDefault() ?? "User")
            };


            foreach (var role in userRoles)

            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public Task<CookieOptions> GetCookieOptionsAsync()
        {
            var isProd = !env.IsDevelopment();

            return Task.FromResult(new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Path = "/",
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            });
        }

        public async Task<(bool isAuthenticated, string? message)> IsUserAuthenticatedAsync(HttpContext context)
        {
            var token = context.Request.Cookies["auth_token"];
            if (token == null)
            {
                return (false, null);
            }

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(config["Jwt:Key"]!);
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = config["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = config["Jwt:Audience"],
                    ValidateLifetime = true,
                }, out SecurityToken validatedToken);

                var role = principal.FindFirst("role")?.Value
                    ?? principal.FindFirst(ClaimTypes.Role)?.Value;
                return (true, role.ToUpper());

            }
            catch (Exception)
            {
                return (false, "Invalid user session.");

            }
        }

        public async Task<HttpStatusCode> UpdateUserPasswordAsync(int userId, UpdatePasswordDTO updatePassword)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());
            //If this happens we have other
            if (user == null)
            {
                return HttpStatusCode.NotFound;
            }
            

            var result = await userManager.ChangePasswordAsync(user, updatePassword.OldPassword, updatePassword.NewPassword);
            return result.Succeeded ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
        }
    }
}
