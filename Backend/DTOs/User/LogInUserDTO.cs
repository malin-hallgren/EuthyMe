using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.User
{
    public class LogInUserDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
