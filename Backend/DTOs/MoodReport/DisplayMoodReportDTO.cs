namespace Backend.DTOs.MoodReport
{
    public class DisplayMoodReportDTO
    {
        public DateOnly Date { get; set; }
        public int? MoodScore { get; set; }
        public int? SleepScore { get; set; }
        public bool MedsTaken { get; set; }
        public bool HasReportedToday { get; set; }

    }
}
