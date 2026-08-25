using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.MoodReport
{
    public class CreateMoodReportDTO
    {
        [Range(1, 5)]
        public int MoodScore { get; set; }
        [Range(1, 5)]
        public int SleepScore { get; set; }
        public bool MedsTaken { get; set; } = true; //default to true in case user has set the med check not to show
    }
}
