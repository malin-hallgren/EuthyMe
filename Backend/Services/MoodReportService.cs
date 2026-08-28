using Backend.DTOs.MoodReport;
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
    }
}
