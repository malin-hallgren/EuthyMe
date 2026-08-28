using Backend.DTOs.MoodReport;
using Backend.DTOs.User;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Backend.Services.IServices;
using System.Security.Claims;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository _userRepository)
        {
            userRepository = _userRepository;
        }
        public async Task<IEnumerable<DisplayUserDTO>?> GetUsersAsync()
        {
            IEnumerable<User>? users = await userRepository.GetUsersAsync();

            if (users == null)
            {
                return null;
            }

            return users.Select(u => new DisplayUserDTO
            {
                DisplayName = u.DisplayName,
                Email = u.Email,
                MoodReports = u.MoodReports.Select(m => new DisplayMoodReportDTO
                {
                    MoodScore = m.MoodScore,
                    SleepScore = m.SleepScore,
                    Date = m.Date,
                    MedsTaken = m.MedsTaken
                })
                .OrderBy(m => m.Date)
                .ToList()
            });
        }
        public async Task<DisplayUserDTO> GetUserByIdAsync(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
