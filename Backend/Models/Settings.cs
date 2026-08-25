using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Settings
    {
        public int Id { get; set; }
        public bool ShowMeds { get; set; } = true; //default to true
        public string? PanicLink { get; set; }
        [Range(2, 2)]
        public string Language { get; set; } = "en"; //default to english, note, massive TODO

        public int UserId { get; set; } // Foreign key to the User entity
        public User User { get; set; }
    }
}
