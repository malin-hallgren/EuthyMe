using Backend.Models;

namespace Backend.Repositories.IRepositories
{
    public interface ISettingsRepository
    {
        Task<Settings?> GetSettingsForUserAsync(int userId);
        Task<bool> UpdateSettingsForUserAsync(User user, Settings settings);
        Task<bool> AddSettingsToUserAsync(Settings settings);
    }
}
