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
            var adminRole = await context.Roles
                .AsNoTracking()
                .Where(r => r.Name == "Admin")
                .Select(r => r.Id)
                .FirstOrDefaultAsync();

            return await context.Users
                .AsNoTracking()
                .Where(u => adminRole == null || !context.UserRoles.Any(ur => ur.UserId == u.Id && ur.RoleId == adminRole))
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
