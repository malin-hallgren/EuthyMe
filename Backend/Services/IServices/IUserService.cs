using Backend.DTOs.User;

namespace Backend.Services.IServices
{
    public interface IUserService
    {
        Task<IEnumerable<DisplayUserDTO>?> GetUsersAsync();
        Task<DisplayUserDTO> GetUserByIdAsync(int userId);
    }
}
