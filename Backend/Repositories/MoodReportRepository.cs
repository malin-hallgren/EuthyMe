using Backend.Data;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class MoodReportRepository : IMoodReportRepository
    {
        private readonly EuthyMeDbContext context;

        public MoodReportRepository(EuthyMeDbContext _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<MoodReport>?> GetMoodReportsByUserIdAsync(int userId)
        {
            return await context.MoodReports
                .AsNoTracking()
                .Where(m => m.UserId == userId)
                .OrderBy(m => m.Date)
                .ToListAsync();
        }

        public async Task<bool> CheckDailyReportExistsAsync(int userId, DateOnly date)
        {
            return await context.MoodReports
                .AsNoTracking()
                .AnyAsync(m => m.UserId == userId && m.Date == date);
        }

        public async Task<bool> CreateMoodReportAsync(MoodReport moodReport)
        {
            await context.MoodReports.AddAsync(moodReport);
            return await context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<MoodReport>> GetMoodReportsByUserIdAndDateAsync(int userId, DateOnly cutoffDate)
        {
            return await context.MoodReports
                .AsNoTracking()
                .Where(m => m.UserId == userId && m.Date >= cutoffDate)
                .OrderBy(m => m.Date)
                .ToListAsync();
        }
    }
}
