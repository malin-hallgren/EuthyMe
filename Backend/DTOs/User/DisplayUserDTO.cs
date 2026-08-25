using Backend.DTOs.MoodReport;

namespace Backend.DTOs.User
{
    public class DisplayUserDTO
    {
        public string DisplayName { get; set; }
        public string Email { get; set; }

        public List<DisplayMoodReportDTO> MoodReports { get; set; } = new List<DisplayMoodReportDTO>();
    }
}
