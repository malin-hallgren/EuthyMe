using Backend.DTOs.User;

namespace Backend.Services.IServices
{
    public interface IUserService
    {
        Task<IEnumerable<UserActivityDTO>?> GetUsersAsync();
        Task<ThinDisplayUserDTO?> GetUserByIdAsync(int userId);

        Task<(bool isSuccess, string? message)> RegisterUserAsync(RegisterUserDTO registerUser);
    }
}
