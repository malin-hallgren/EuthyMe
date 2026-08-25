using Backend.Data;
using Backend.Models;
using Backend.Repositories;
using Backend.Repositories.IRepositories;
using Backend.Services;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Configuration.AddUserSecrets<Program>(optional: true);

            builder.Services.AddControllers();

            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<EuthyMeDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration["ConnectionString"]);
            });

            //builder.Services.AddCors();

            builder.Services.AddIdentity<User, IdentityRole<int>>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireDigit = true;
            })
                .AddEntityFrameworkStores<EuthyMeDbContext>();

            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IUserService, UserService>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseAuthentication(); 

            app.MapControllers();

            app.Run();
        }
    }
}
