using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Backend.Data
{
    public class EuthyMeDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public EuthyMeDbContext(DbContextOptions<EuthyMeDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            var seedUser1 = new User
            {
                Id = 1,
                UserName = "test1@email.com",
                NormalizedUserName = "TEST1@EMAIL.COM",
                Email = "test1@email.com",
                NormalizedEmail = "TEST1@EMAIL.COM",
                DisplayName = "Test User 1",
                EmailConfirmed = false,
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = true,
                AccessFailedCount = 0,
                ConcurrencyStamp = "1",
                SecurityStamp = "1"
            };

            var seedUser2 = new User
            {
                Id = 2,
                UserName = "test2@email.com",
                NormalizedUserName = "TEST2@EMAIL.COM",
                Email = "test2@email.com",
                NormalizedEmail = "TEST2@EMAIL.COM",
                DisplayName = "Test User 2",
                EmailConfirmed = false,
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = true,
                AccessFailedCount = 0,
                ConcurrencyStamp = "2",
                SecurityStamp = "2"
            };

            //Passwords added later for seed data users to not break the standard Identity password flow
            builder.Entity<User>()
                .HasData(seedUser1, seedUser2);

            builder.Entity<User>()
                .HasIndex(u => u.Email);

            builder.Entity<MoodReport>()
                .HasData(
                    new MoodReport
                    {
                        Id = 1,
                        UserId = 1,
                        MoodScore = 5,
                        SleepScore = 3,
                        MedsTaken = true,
                        Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1))
                    },
                    new MoodReport
                    {
                        Id = 2,
                        UserId = 2,
                        MoodScore = 5,
                        SleepScore = 3,
                        MedsTaken = true,
                        Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1))
                    },
                    new MoodReport
                    {
                        Id = 3,
                        UserId = 2,
                        MoodScore = 3,
                        SleepScore = 4,
                        MedsTaken = false,
                        Date = DateOnly.FromDateTime(DateTime.UtcNow)
                    },
                    new MoodReport
                    {
                        Id = 4,
                        UserId = 2,
                        MoodScore = 3,
                        SleepScore= 4,
                        MedsTaken = true,
                        Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-2))
                    }
                );

            builder.Entity<MoodReport>()
                .HasIndex(m => new { m.UserId, m.Date });

            base.OnModelCreating(builder);
        }
    }
}