using Backend.DTOs.User;

namespace Backend.Services.IServices
{
    public interface IUserService
    {
        Task<(IEnumerable<UserActivityDTO>? activeUsers, IEnumerable<UserActivityDTO>? inactiveUsers)> GetUsersAsync();
        Task<ThinDisplayUserDTO?> GetUserByIdAsync(int userId);
        Task<DisplayUserDTO> GetDashboardUser(int userId, int days);
        Task<(bool isSuccess, string? message)> RegisterUserAsync(RegisterUserDTO registerUser);
    }
}
