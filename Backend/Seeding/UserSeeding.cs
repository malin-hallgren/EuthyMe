using Backend.Repositories.IRepositories;
using Microsoft.AspNetCore.Identity;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Seeding
{
    public class UserSeeding
    {
        //private readonly IUserRepository userRepository;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole<int>> roleManager;

        public UserSeeding( UserManager<User> _userManager, RoleManager<IdentityRole<int>> _roleManager)
        {
            //userRepository = _userRepository;
            userManager = _userManager;
            roleManager = _roleManager;
        }

        internal async Task CompleteUserSeedingAsync()
        {
            var users = await userManager.Users.ToListAsync();
            await AddRolesAsync();
            

            foreach (var user in users)
            {
                await SetUsernameAsync(user);
                await SetDefaultPassword(user);
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

        private async Task SetUsernameAsync(User user)
        {
            if (string.IsNullOrEmpty(user.UserName))
            {
                user.UserName = user.Email.Split('@')[0];
            }
        }

        private async Task SetDefaultPassword(User user)
        {
            if (string.IsNullOrEmpty(user.PasswordHash))
            {
                await userManager.AddPasswordAsync(user, "Password123!");
            }
        }

        private async Task AddRolesAsync()
        {
            var roles = new[] { "Admin", "User" };
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole<int>(role));
                }
            }
        }
    }
}
