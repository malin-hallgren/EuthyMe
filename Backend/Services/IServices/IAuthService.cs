using Backend.DTOs.User;
using Backend.Models;

namespace Backend.Services.IServices
{
    public interface IAuthService
    {
        Task<(bool isSuccess, List<string>? errors, string? token, string? role)> AuthenticateUserAsync(LogInUser logInUser);
        Task<string> GenerateJwtToken(User user);
        Task<CookieOptions> GetCookieOptionsAsync();

        Task<(bool isAuthenticated, string? message)> IsUserAuthenticatedAsync(HttpContext context);
    }
}
