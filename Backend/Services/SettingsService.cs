using Backend.DTOs.Settings;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Backend.Services.IServices;
using System.Net;

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

        public async Task<(HttpStatusCode status, string message)> UpdateSettingsForUserId(int userId, SettingsInDTO settingsInDTO)
        {
            var settings = await settingsRepository.GetSettingsForUserAsync(userId);
            var user = await userRepository.GetUserByIdAsync(userId);
            bool isSuccess = false;

            if (settings == null) //This should never happen, but just in case, we create a new settings object if it doesn't exist
            {
                settings = new Settings
                {
                    UserId = userId,
                    ShowMeds = settingsInDTO.ShowMeds,
                    PanicLink = settingsInDTO.PanicLink,
                    Language = settingsInDTO.Language,
                    Theme = settingsInDTO.Theme
                };
                // Add the new settings to the database
                isSuccess = await settingsRepository.AddSettingsToUserAsync(settings);
            }
            else
            {
                // Update existing settings
                settings.ShowMeds = settingsInDTO.ShowMeds;
                settings.PanicLink = settingsInDTO.PanicLink;
                settings.Language = settingsInDTO.Language;
                settings.Theme = settingsInDTO.Theme;
                // Save changes to the database
                isSuccess = await settingsRepository.UpdateSettingsForUserAsync(user, settings);

                isSuccess =await userRepository.UpdateUserDisplayNameAsync(userId, settingsInDTO.DisplayName);
            }
            if (!isSuccess)
            {
                return (HttpStatusCode.BadRequest, "ERR_SETTINGS_UPDATE_FAILED");
            }
            return (HttpStatusCode.OK, isSuccess ? "SUC_SETTINGS_UPDATED_COMPLETE" : "ERR_SETTINGS_UPDATE_FAILED");
        }
    }
}
