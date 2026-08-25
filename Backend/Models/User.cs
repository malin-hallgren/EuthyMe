using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User : IdentityUser<int>
    {
        [StringLength(50)]
        public string? DisplayName { get; set; }
        public List<MoodReport> MoodReports { get; set; } = new List<MoodReport>();
    }
}
