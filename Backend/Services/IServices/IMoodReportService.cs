using Backend.DTOs.MoodReport;

namespace Backend.Services.IServices
{
    public interface IMoodReportService
    {
        Task<List<DisplayMoodReportDTO>?> GetMoodReportsByUserIdAsync(int userId);
    }
}
