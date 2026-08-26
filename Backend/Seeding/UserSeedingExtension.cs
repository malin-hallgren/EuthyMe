namespace Backend.Seeding
{
    public static class UserSeedingExtension
    {
        public static async Task CompleteUserSeedAsync(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var userSeeding = scope.ServiceProvider.GetRequiredService<UserSeeding>();
                await userSeeding.CompleteUserSeedingAsync();
            }
        }
    }
}
