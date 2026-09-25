using Backend.DTOs.MoodReport;
using Backend.Models;
using Backend.Repositories.IRepositories;
using Backend.Services.IServices;
using System.Net;

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

        public async Task<(HttpStatusCode status, string? message)> CreateMoodReportAsync(int userId,CreateMoodReportDTO createMoodReportDTO)
        {
            if(await moodReportRepository.CheckDailyReportExistsAsync(userId, DateOnly.FromDateTime(DateTime.UtcNow)))
            {
                return (HttpStatusCode.Conflict, "A mood report for this date already exists");
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
                return (HttpStatusCode.BadRequest, "Failed to create mood report");
            }
            return (HttpStatusCode.Created, $"Mood report for {DateOnly.FromDateTime(DateTime.UtcNow)} created successfully");
        }

        public async Task<DashboardMoodReportDTO> GetMoodReportsForDashboardAsync(int userId, int days)
        {
            var cutoff = DateOnly.FromDateTime(DateTime.Today.AddDays(-(days - 1)));
            var createdMoodReports = await moodReportRepository.GetMoodReportsByUserIdAndDateAsync(userId, cutoff);

            var reportLookup = createdMoodReports.DistinctBy(m => m.Date).ToDictionary(m => m.Date);

            var dashboardMoodReport = new DashboardMoodReportDTO();

            var moodValues = new List<int>();
            var sleepValues = new List<int>();
            var medsValues = new List<bool>();

            for (int i = 0; i < days; i++)
            {
                var currentDate = cutoff.AddDays(i);

                if (reportLookup.TryGetValue(currentDate, out var report))
                {
                    dashboardMoodReport.MoodReports.Add(new DisplayMoodReportDTO
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
                    dashboardMoodReport.MoodReports.Add(new DisplayMoodReportDTO
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

            var validMoodValues = moodValues.Where(m => m > 0);
            dashboardMoodReport.AverageMoodScore = validMoodValues.Any()
                ? (float)Math.Round(validMoodValues.Average(), 2)
                : 0f;

            var validSleepValues = sleepValues.Where(m => m > 0);
            dashboardMoodReport.AverageSleepScore = validSleepValues.Any()
                ? (float)Math.Round(validSleepValues.Average(), 2)
                : 0f;
            dashboardMoodReport.AmountMissedMeds = medsValues.Count(m => !m);

            dashboardMoodReport.HasReportedToday = reportLookup.ContainsKey(DateOnly.FromDateTime(DateTime.UtcNow));

            return dashboardMoodReport;
        }

        public Task<bool> DeleteMoodReportsForUser(int userId)
        {
            return moodReportRepository.DeleteMoodReportsForUser(userId);
        }
    }
}
