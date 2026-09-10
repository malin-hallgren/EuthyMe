using Backend.DTOs.MoodReport;
using Backend.DTOs.User;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly UserManager<User> userManager;

        private readonly IMoodReportService moodReportService;

        public UserService(IUserRepository _userRepository, UserManager<User> _userManager, IMoodReportService _moodReportService)
        {
            userRepository = _userRepository;
            userManager = _userManager;
            moodReportService = _moodReportService;
        }
        public async Task<(IEnumerable<UserActivityDTO>? activeUsers, IEnumerable<UserActivityDTO>? inactiveUsers)> GetUsersAsync()
        {
            IEnumerable<User>? users = await userRepository.GetUsersAsync();

            if (users == null)
            {
                return (null, null);
            }

            var activeUsers = users.Select(u =>
            {
                if (!u.MoodReports.Any())
                {
                    return new UserActivityDTO
                    {
                        Id = u.Id,
                        DisplayName = u.DisplayName,
                        DaysAgo = null
                    };
                }

                int days = (int)(DateTime.Now - u.MoodReports.Max(m => m.Date.ToDateTime(TimeOnly.MinValue))).TotalDays;


                return new UserActivityDTO
                {   
                    Id = u.Id,
                    DisplayName = u.DisplayName,
                    DaysAgo = days,
                };
            })
            .OrderBy(u => u.DaysAgo)
            .ToList();

            var inactiveUsers = activeUsers.Where(u => u.DaysAgo > 0 || u.DaysAgo == null).ToList();
            activeUsers.RemoveAll(u => u.DaysAgo > 0 || u.DaysAgo == null);

            return (activeUsers, inactiveUsers);
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
            await userManager.AddToRoleAsync(user, "User");

            if (result.Succeeded)
            {
                return (true, "User registered successfully.");
            }

            var message = string.Join("; ", result.Errors.Select(e => e.Description));
            return (false, message);
        }

        public async Task<DisplayUserDTO?> GetDashboardUser(int userId, int days)
        {
            var cutoff = DateOnly.FromDateTime(DateTime.Today.AddDays(-(days -1 )));

            var user = await userRepository.GetDashboardUserAsync(userId, cutoff);
            if (user == null)
            {
                return null;
            }

            var moodReports = await moodReportService.GetMoodReportsForDashboardAsync(userId, days);


            return new DisplayUserDTO
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                MoodReports = moodReports.MoodReports.OrderBy(m => m.Date).ToList(),
                HasReportedToday = moodReports.HasReportedToday,
                AverageMoodScore = moodReports.AverageMoodScore,
                AverageSleepScore = moodReports.AverageSleepScore,
                AmountMissedMeds = moodReports.AmountMissedMeds
            };
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return false;
            }

            var result = await userRepository.DeleteUserAsync(user);
            return result;
        }
    }
}
