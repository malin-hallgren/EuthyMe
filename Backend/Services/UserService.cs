using Backend.DTOs.MoodReport;
using Backend.DTOs.User;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly UserManager<User> userManager;

        public UserService(IUserRepository _userRepository, UserManager<User> _userManager)
        {
            userRepository = _userRepository;
            userManager = _userManager;
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
        public async Task<ThinDisplayUserDTO?> GetUserByIdAsync(int userId)
        {
            User? user = await userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return null;
            }

            return new ThinDisplayUserDTO
            {
                DisplayName = user.DisplayName,
                Email = user.Email
            };
        }

        public async Task<(bool isSuccess, string? message)> RegisterUserAsync(RegisterUserDTO registerUser)
        {
            var user = new User
            {
                DisplayName = registerUser.DisplayName ?? registerUser.Email.Split('@')[0],
                Email = registerUser.Email,
                UserName = registerUser.Email
            };

            var result = await userManager.CreateAsync(user, registerUser.Password);

            if (result.Succeeded)
            {
                return (true, "User registered successfully.");
            }

            var message = string.Join("; ", result.Errors.Select(e => e.Description));
            return (false, message);
        }
    }
}
