using Backend.Data;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class SettingsRepository : ISettingsRepository
    {
        private readonly EuthyMeDbContext context;

        public SettingsRepository(EuthyMeDbContext _context)
        {
            context = _context;
        }

        public async Task<Settings?> GetSettingsForUserAsync(int userId)
        {
            return await context.Settings.FirstOrDefaultAsync(s => s.UserId == userId);
        }

        public async Task<bool> UpdateSettingsForUserAsync(User user, Settings settings)
        {
            var existingSettings = await context.Settings.FirstOrDefaultAsync(s => s.UserId == user.Id);
            if (existingSettings == null)
            {
                await context.Settings.AddAsync(settings);
            }
            else
            {
                existingSettings.ShowMeds = settings.ShowMeds;
                existingSettings.PanicLink = settings.PanicLink;
                existingSettings.Language = settings.Language;
                existingSettings.Theme = settings.Theme;
            }
            return await context.SaveChangesAsync() > 0;
        }

        public async Task<bool> AddSettingsToUserAsync(Settings settings)
        {
            await context.Settings.AddAsync(settings);
            return await context.SaveChangesAsync() > 0;
        }
    }
}
