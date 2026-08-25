using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class MoodReport
    {
        public int Id { get; set; }
        [Range(1, 5)]
        public int MoodScore { get; set; }
        [Range(1, 5)]
        public int SleepScore { get; set; }
        public bool MedsTaken { get; set; } = true; //default to true in case user has set the med check not to show
        public DateOnly Date { get; set; }
        public int UserId { get; set; } // Foreign key to the User entity
        public User User { get; set; }
    }
}
