using Backend.Models;
using Backend.DTOs.Settings;
using System.Net;

namespace Backend.Services.IServices
{
    public interface ISettingsService
    {
        Task<SettingsOutDTO> GetSettingsForUserId(int userId);
        Task<(HttpStatusCode status, string message)> UpdateSettingsForUserId(int userId, SettingsInDTO settings);
    }
}
