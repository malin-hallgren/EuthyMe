using Backend.DTOs.User;
using System.Net;

namespace Backend.Services.IServices
{
    public interface IUserService
    {
        Task<(IEnumerable<UserActivityDTO>? activeUsers, IEnumerable<UserActivityDTO>? inactiveUsers)> GetUsersAsync();
        Task<ThinDisplayUserDTO?> GetUserByIdAsync(int userId);
        Task<DisplayUserDTO> GetDashboardUser(int userId, int days);
        Task<(HttpStatusCode status, string? message)> RegisterUserAsync(RegisterUserDTO registerUser);
        Task<HttpStatusCode> DeleteUserAsync(int userId);
    }
}
