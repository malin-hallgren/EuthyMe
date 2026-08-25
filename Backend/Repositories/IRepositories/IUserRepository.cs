using Backend.Models;

namespace Backend.Repositories.IRepositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>>? GetUsersAsync();
        Task<User>? GetUserByIdAsync(int userId);
    }
}
