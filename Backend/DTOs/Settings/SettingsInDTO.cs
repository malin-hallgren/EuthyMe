using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Settings
{
    public class SettingsInDTO
    {
        public string DisplayName { get; set; }
        public bool ShowMeds { get; set; }
        public string PanicLink { get; set; }

        [StringLength(2, MinimumLength = 2)]
        public string Language { get; set; }

        public string Theme { get; set; }
    }
}
