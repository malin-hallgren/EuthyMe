using Backend.Data;
using Backend.Middlewares;
using Backend.Models;
using Backend.Repositories;
using Backend.Repositories.IRepositories;
using Backend.Seeding;
using Backend.Services;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;

namespace Backend
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var corsConfig = "AllowFrontend";

            builder.Configuration.AddUserSecrets<Program>(optional: true);

            builder.Services.AddControllers();

            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<EuthyMeDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration["ConnectionString"]);
            });

            

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: corsConfig,
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                    });
            });

            builder.Services.AddIdentity<User, IdentityRole<int>>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireDigit = true;
            })
                .AddEntityFrameworkStores<EuthyMeDbContext>();

            builder.Services.PostConfigure<CookieAuthenticationOptions>(
                 IdentityConstants.ApplicationScheme, options =>
                 {
                     options.LoginPath = null;  // Disable redirect to login
                 });


            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            if (context.Request.Cookies.TryGetValue("auth_token", out var token))
                            {
                                context.Token = token;
                            }
                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            return Task.CompletedTask;
                        }
                    };

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
                        ValidateIssuer = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        ValidateLifetime = true,
                    };
                });

            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IMoodReportRepository, MoodReportRepository>();

            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IMoodReportService, MoodReportService>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
                await app.CompleteUserSeedAsync();
            }

            app.UseCors(corsConfig);

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseMiddleware<GlobalException>();

            app.MapControllers();

            app.Run();
        }
    }
}
