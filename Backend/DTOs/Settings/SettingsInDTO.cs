using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Settings
{
    public class SettingsInDTO
    {
        public bool ShowMeds { get; set; }
        public string? PanicLink { get; set; }

        [Range(2, 2)]
        public string Language { get; set; }

        public string Theme { get; set; }
    }
}
