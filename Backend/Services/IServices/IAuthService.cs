using Backend.DTOs.User;

namespace Backend.Services.IServices
{
    public interface IAuthService
    {
        Task<(bool isSuccess, List<string>? errors)> AuthenticateUserAsync(LogInUser logInUser);
    }
}
