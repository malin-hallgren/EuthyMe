namespace Backend.DTOs.User
{
    public class UserActivityDTO
    {
        public string DisplayName { get; set; }
        public int DaysAgo { get; set; }
        public string LastActive { get; set; }
    }
}
