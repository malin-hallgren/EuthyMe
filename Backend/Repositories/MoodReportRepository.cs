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
    }
}
