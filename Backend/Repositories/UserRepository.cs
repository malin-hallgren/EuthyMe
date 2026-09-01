using Backend.Data;
using Backend.DTOs.User;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly EuthyMeDbContext context;

        public UserRepository(EuthyMeDbContext _context)
        {
            context = _context;
        }
        public async Task<IEnumerable<User>?> GetUsersAsync()
        {
            return await context.Users
                .AsNoTracking()
                .Include(u => u.MoodReports)
                .ToListAsync();
        }
        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
