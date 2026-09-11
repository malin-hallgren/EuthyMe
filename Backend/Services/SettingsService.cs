using Backend.DTOs.Settings;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Backend.Services.IServices;

namespace Backend.Services
{
    public class SettingsService : ISettingsService
    {
        private readonly ISettingsRepository settingsRepository;
        private readonly IUserRepository userRepository;

        public SettingsService(ISettingsRepository _settingsRepository, IUserRepository _userRepository)
        {
            settingsRepository = _settingsRepository;
            userRepository = _userRepository;
        }

        public async Task<SettingsOutDTO> GetSettingsForUserId(int userId)
        {
            User? user = await userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            var settings = await settingsRepository.GetSettingsForUserAsync(userId);

            if (settings == null)
            {
                return new SettingsOutDTO()
                {
                    DisplayName = user.DisplayName,
                    ShowMeds = true,
                    PanicLink = "https://www.google.com",
                    Language = "EN",
                    Theme = "Light"
                };
            }

            return new SettingsOutDTO
            {   
                DisplayName = user.DisplayName,
                ShowMeds = settings.ShowMeds,
                PanicLink = settings.PanicLink != null ? settings.PanicLink : "https://www.google.com",
                Language = settings.Language,
                Theme = settings.Theme
            };

        }
    }
}
