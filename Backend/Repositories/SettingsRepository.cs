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

        public async Task<Settings?> GetSettingsForUserAsync (int userId)
        {
            return await context.Settings.FirstOrDefaultAsync(s => s.UserId == userId);
        }
    }
}
