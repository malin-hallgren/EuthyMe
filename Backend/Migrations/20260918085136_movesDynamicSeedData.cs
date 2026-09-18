using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class movesDynamicSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 3);

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "MoodReports",
                columns: new[] { "Id", "Date", "MedsTaken", "MoodScore", "SleepScore", "UserId" },
                values: new object[,]
                {
                    { 1, new DateOnly(2026, 9, 16), true, 5, 3, 2 },
                    { 2, new DateOnly(2026, 9, 15), false, 3, 4, 2 },
                    { 3, new DateOnly(2026, 9, 14), true, 3, 4, 2 },
                    { 4, new DateOnly(2026, 9, 16), false, 5, 1, 3 },
                    { 5, new DateOnly(2026, 9, 15), false, 4, 2, 3 },
                    { 6, new DateOnly(2026, 9, 14), true, 5, 2, 3 }
                });
        }
    }
}
