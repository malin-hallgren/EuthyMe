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

                string[] roles = { "Admin", "User" };
                foreach (var role in roles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                    {
                        await roleManager.CreateAsync(new IdentityRole<int> { Name = role });
                    }
                }

                var users = await userManager.Users.ToListAsync();

                foreach (var user in users)
                {
                    if (!await userManager.HasPasswordAsync(user))
                    {
                        var passwordResult = await userManager.AddPasswordAsync(user, "Password123!");
                    }

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

                    if (user.Id == 2 && user.MoodReports.Count == 0)
                    {
                        user.MoodReports.AddRange(new List<MoodReport>
                        {
                            new MoodReport
                            {
                                Id = 1,
                                UserId = 2,
                                MoodScore = 5,
                                SleepScore = 3,
                                MedsTaken = true,
                                Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1))
                            },
                            new MoodReport
                            {
                                Id = 2,
                                UserId = 2,
                                MoodScore = 3,
                                SleepScore = 4,
                                MedsTaken = false,
                                Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-2))
                            },
                            new MoodReport
                            {
                                Id = 3,
                                UserId = 2,
                                MoodScore = 3,
                                SleepScore = 4,
                                MedsTaken = true,
                                Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-3))
                            }
                        });
                    }

                    else if (user.Id == 3 && user.MoodReports.Count == 0)
                    {
                        user.MoodReports.AddRange(new List<MoodReport>
                        {
                            new MoodReport
                            {
                                Id = 4,
                                UserId = 3,
                                MoodScore = 5,
                                SleepScore = 1,
                                MedsTaken = false,
                                Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1))
                            },
                            new MoodReport
                            {
                                Id = 5,
                                UserId = 3,
                                MoodScore = 4,
                                SleepScore = 2,
                                MedsTaken = false,
                                Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-2))
                            },
                            new MoodReport
                            {
                                Id = 6,
                                UserId = 3,
                                MoodScore = 5,
                                SleepScore = 2,
                                MedsTaken = true,
                                Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-3))
                            }
                        });
                    }
                }

            }
        }
    }
}

