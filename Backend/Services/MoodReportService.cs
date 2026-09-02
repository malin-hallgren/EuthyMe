using Backend.DTOs.MoodReport;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Backend.Services.IServices;

namespace Backend.Services
{
    public class MoodReportService : IMoodReportService
    {
        private readonly IMoodReportRepository moodReportRepository;

        public MoodReportService(IMoodReportRepository _moodReportRepository)
        {
            moodReportRepository = _moodReportRepository;
        }

        public async Task<List<DisplayMoodReportDTO>?> GetMoodReportsByUserIdAsync(int userId)
        {
            var moodReports = await moodReportRepository.GetMoodReportsByUserIdAsync(userId);
            return moodReports?.Select(m => new DisplayMoodReportDTO
            {
                MoodScore = m.MoodScore,
                SleepScore = m.SleepScore,
                Date = m.Date,
                MedsTaken = m.MedsTaken
            }).ToList();
        }

        public async Task<(bool isSuccess, string? message)> CreateMoodReportAsync(int userId,CreateMoodReportDTO createMoodReportDTO)
        {
            if(await moodReportRepository.CheckDailyReportExistsAsync(userId, DateOnly.FromDateTime(DateTime.UtcNow)))
            {
                return (false, "A mood report for this date already exists");
            }

            var moodReport = new MoodReport
            {
                MoodScore = createMoodReportDTO.MoodScore,
                SleepScore = createMoodReportDTO.SleepScore,
                Date = DateOnly.FromDateTime(DateTime.UtcNow),
                MedsTaken = createMoodReportDTO.MedsTaken,
                UserId = userId
            };

            var result = await moodReportRepository.CreateMoodReportAsync(moodReport);
            if (!result)
            {
                return (false, "Failed to create mood report");
            }
            return (true, $"Mood report for {DateOnly.FromDateTime(DateTime.UtcNow)} created successfully");
        }
    }
}
