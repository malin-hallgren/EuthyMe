using Backend.Models;

namespace Backend.Repositories.IRepositories
{
    public interface IMoodReportRepository
    {
        Task<IEnumerable<MoodReport>?> GetMoodReportsByUserIdAsync(int userId);

        Task<bool> CheckDailyReportExistsAsync(int userId, DateOnly date);

        Task<bool> CreateMoodReportAsync(MoodReport moodReport);

        Task<IEnumerable<MoodReport>> GetMoodReportsByUserIdAndDateAsync(int userId, DateOnly cutoffDate);
    }
}
