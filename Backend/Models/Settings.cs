using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Settings
    {
        public int Id { get; set; }
        public bool ShowMeds { get; set; } = true; //default to true
        public string? PanicLink { get; set; } = "https://www.google.com";

        [StringLength(2, MinimumLength = 2)]
        public string Language { get; set; } = "EN"; //default to english, note, massive TODO

        public string Theme { get; set; } = "light"; //default to light theme

        public int UserId { get; set; } // Foreign key to the User entity
        public User User { get; set; }
    }
}
