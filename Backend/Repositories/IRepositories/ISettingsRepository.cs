using Backend.Models;

namespace Backend.Repositories.IRepositories
{
    public interface ISettingsRepository
    {
        Task<Settings?> GetSettingsForUserAsync(int userId);
    }
}
