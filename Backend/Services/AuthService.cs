using Backend.DTOs.User;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;

        private readonly ITokenService tokenService;

        public AuthService(SignInManager<User> _signInManager, UserManager<User> _userManager, ITokenService _tokenService)
        {
            signInManager = _signInManager;
            userManager = _userManager;
            tokenService = _tokenService;
        }

        public async Task<(bool isSuccess, List<string>? errors)> AuthenticateUserAsync(LogInUser logInUser)
        {
            var errors = new List<string>();
            var user = await userManager.FindByEmailAsync(logInUser.UserName); //UserName is duplicated from Email
            if (user == null || !await userManager.CheckPasswordAsync(user, logInUser.Password))
            {
                errors.Add("Invalid credentials");
                return (false, errors);
            }
            
            await signInManager.SignInAsync(user, false);

            var token = await tokenService.GenerateJwtToken(user);

            return (true, null);
        }
    }
}
