using Backend.DTOs.Password;
using Backend.DTOs.User;
using Backend.Models;
using System.Net;

namespace Backend.Services.IServices
{
    public interface IAuthService
    {
        Task<(HttpStatusCode status, List<string>? errors, string? token, string? role)> AuthenticateUserAsync(LogInUserDTO logInUser);
        Task<string> GenerateJwtToken(User user);
        Task<CookieOptions> GetCookieOptionsAsync();

        Task<(bool isAuthenticated, string? message)> IsUserAuthenticatedAsync(HttpContext context);

        Task<HttpStatusCode> UpdateUserPasswordAsync(int userId, UpdatePasswordDTO updatePassword);
    }
}
