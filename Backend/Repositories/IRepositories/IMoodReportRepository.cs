using Backend.Models;

namespace Backend.Repositories.IRepositories
{
    public interface IMoodReportRepository
    {
        Task<IEnumerable<MoodReport>?> GetMoodReportsByUserIdAsync(int userId);
    }
}
