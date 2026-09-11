using Backend.Models;
using Backend.DTOs.Settings;

namespace Backend.Services.IServices
{
    public interface ISettingsService
    {
        Task<SettingsOutDTO> GetSettingsForUserId(int userId);
    }
}
