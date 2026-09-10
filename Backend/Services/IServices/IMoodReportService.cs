using Backend.DTOs.MoodReport;

namespace Backend.Services.IServices
{
    public interface IMoodReportService
    {
        Task<List<DisplayMoodReportDTO>?> GetMoodReportsByUserIdAsync(int userId);

        Task<(bool isSuccess, string? message)> CreateMoodReportAsync(int userId, CreateMoodReportDTO createMoodReportDTO);

        Task<DashboardMoodReportDTO> GetMoodReportsForDashboardAsync(int userId, int days);

        Task<bool> DeleteMoodReportsForUser(int userId);
    }
}
