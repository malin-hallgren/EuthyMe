namespace Backend.DTOs.User
{
    public class UserActivityDTO
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public int? DaysAgo { get; set; }
    }
}
