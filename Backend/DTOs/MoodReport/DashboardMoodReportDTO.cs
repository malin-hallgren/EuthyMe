namespace Backend.DTOs.MoodReport
{
    public class DashboardMoodReportDTO
    {
        public List<DisplayMoodReportDTO> MoodReports {  get; set; } = new List<DisplayMoodReportDTO>();
        public bool HasReportedToday { get; set; }
        public float AverageMoodScore { get; set; }
        public float AverageSleepScore { get; set; }
        public int AmountMissedMeds { get; set; }
    }
}
