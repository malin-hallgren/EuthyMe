using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class addsettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Theme",
                table: "Settings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "DisplayName", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { 3, 0, "3", "Test User 3", "test3@email.com", false, true, null, "TEST3@EMAIL.COM", "TEST3@EMAIL.COM", null, null, false, "3", false, "test3@email.com" });

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateOnly(2026, 9, 10));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateOnly(2026, 9, 9));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateOnly(2026, 9, 8));

            migrationBuilder.InsertData(
                table: "Settings",
                columns: new[] { "Id", "Language", "PanicLink", "ShowMeds", "Theme", "UserId" },
                values: new object[,]
                {
                    { 1, "EN", "https://www.google.com", true, "light", 1 },
                    { 2, "EN", "https://www.google.com", true, "light", 2 }
                });

            migrationBuilder.InsertData(
                table: "MoodReports",
                columns: new[] { "Id", "Date", "MedsTaken", "MoodScore", "SleepScore", "UserId" },
                values: new object[,]
                {
                    { 4, new DateOnly(2026, 9, 10), false, 5, 1, 3 },
                    { 5, new DateOnly(2026, 9, 9), false, 4, 2, 3 },
                    { 6, new DateOnly(2026, 9, 8), true, 5, 2, 3 }
                });

            migrationBuilder.InsertData(
                table: "Settings",
                columns: new[] { "Id", "Language", "PanicLink", "ShowMeds", "Theme", "UserId" },
                values: new object[] { 3, "EN", "https://www.google.com", true, "light", 3 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "Theme",
                table: "Settings");

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateOnly(2026, 9, 1));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateOnly(2026, 8, 31));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateOnly(2026, 8, 30));
        }
    }
}
