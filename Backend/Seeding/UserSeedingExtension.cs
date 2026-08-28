using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Seeding
{
    public static class UserSeedingExtension
    {
        // WebAplication instead of IApplicationBuilder
        public static async Task CompleteUserSeedAsync(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {

                //check with userManager if our two seed users exist, and have roles and passwords set, if not, set them

                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();

                var users = await userManager.Users.ToListAsync();

                foreach (var user in users)
                {;
                    await userManager.AddPasswordAsync(user, "Password123!");
                    if (user.Id == 1)
                    {
                        if (!await userManager.IsInRoleAsync(user, "Admin"))
                        {
                            await userManager.AddToRoleAsync(user, "Admin");
                        }

                    }
                    else
                    {
                        if (!await userManager.IsInRoleAsync(user, "User"))
                        {
                            await userManager.AddToRoleAsync(user, "User");
                        }
                    }
                }

            }
        }
    }
}

