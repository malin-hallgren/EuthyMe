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
        public async Task<IEnumerable<UserActivityDTO>?> GetUsersAsync()
        {
            IEnumerable<User>? users = await userRepository.GetUsersAsync();

            if (users == null)
            {
                return null;
            }

            return users.Select(u =>
            {
                if (!u.MoodReports.Any())
                {
                    return new UserActivityDTO
                    {
                        DisplayName = u.DisplayName,
                        LastActive = "No activity recorded"
                    };
                }

                int days = (int)(DateTime.Now - u.MoodReports.Max(m => m.Date.ToDateTime(TimeOnly.MinValue))).TotalDays;

                string timeAgo = $"{days} {(days == 1 ? "day" : "days")} ago";

                return new UserActivityDTO
                {
                    DisplayName = u.DisplayName,
                    DaysAgo = days,
                    LastActive = timeAgo
                };
            })
            .OrderBy(u => u.DaysAgo);
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

            var reportLookup = user.MoodReports.ToDictionary(m => m.Date);

            var displayMoodReports = new List<DisplayMoodReportDTO>();

            var moodValues = new List<int>();
            var sleepValues = new List<int>();
            var medsValues = new List<bool>();

            for (int i = 0; i < days; i++)
            {
                var currentDate = cutoff.AddDays(i);

                if (reportLookup.TryGetValue(currentDate, out var report))
                {
                    displayMoodReports.Add(new DisplayMoodReportDTO
                    {
                        Date = report.Date,
                        MoodScore = report.MoodScore,
                        SleepScore = report.SleepScore,
                        MedsTaken = report.MedsTaken
                    });

                    moodValues.Add(report.MoodScore);
                    sleepValues.Add(report.SleepScore); 
                    medsValues.Add(report.MedsTaken);
                }
                else
                {
                    displayMoodReports.Add(new DisplayMoodReportDTO
                    {
                        Date = currentDate,
                        MoodScore = null,
                        SleepScore = null,
                        MedsTaken = true
                    });

                    moodValues.Add(-1);
                    sleepValues.Add(-1);
                    medsValues.Add(true);
                }
            }


            return new DisplayUserDTO
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                MoodReports = displayMoodReports.OrderBy(m => m.Date).ToList(),
                HasReportedToday = reportLookup.ContainsKey(DateOnly.FromDateTime(DateTime.Today)),
                AverageMoodScore = (float)Math.Round(moodValues.Where(m => m > 0).Average(), 2),
                AverageSleepScore = (float)Math.Round(sleepValues.Where(m => m > 0).Average(), 2),
                AmountMissedMeds = medsValues.Count(m => !m)
            };
        }
    }
}
