using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.User
{
    public class RegisterUserDTO
    {
        [StringLength(50)]
        public string? DisplayName { get; set; }
        [Required]
        public string Email { get; set; } 
        [Required]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters.")]
        public string Password { get; set; }
    }
}
