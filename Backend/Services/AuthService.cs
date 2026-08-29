using Backend.DTOs.User;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly IConfiguration config;

        private readonly IWebHostEnvironment env;

        public AuthService(SignInManager<User> _signInManager, UserManager<User> _userManager, IConfiguration _config, IWebHostEnvironment _env)
        {
            signInManager = _signInManager;
            userManager = _userManager;
            config = _config;
            env = _env;
        }

        public async Task<(bool isSuccess, List<string>? errors, string? token)> AuthenticateUserAsync(LogInUser logInUser)
        {
            var errors = new List<string>();
            var user = await userManager.FindByEmailAsync(logInUser.UserName); //UserName is duplicated from Email
            if (user == null || !await userManager.CheckPasswordAsync(user, logInUser.Password))
            {
                errors.Add("Invalid credentials");
                return (false, errors, null);
            }

            var token = await GenerateJwtToken(user);

            return (true, null, token);
        }

        public async Task<string> GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var userRole = await userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("role", userRole.FirstOrDefault() ?? "User")
            };

            var roles = await userManager.GetRolesAsync(user);

            foreach (var role in roles)

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
                Secure = isProd,
                SameSite = isProd ? SameSiteMode.None : SameSiteMode.Lax, //Can't use as frontend and backend have different origins
                Path = "/",
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            });
        }
    }
}
