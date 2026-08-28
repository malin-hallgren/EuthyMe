using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class NoAdminReports : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Date", "UserId" },
                values: new object[] { new DateOnly(2026, 8, 27), 2 });

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Date", "MedsTaken", "MoodScore", "SleepScore" },
                values: new object[] { new DateOnly(2026, 8, 28), false, 3, 4 });

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Date", "MedsTaken" },
                values: new object[] { new DateOnly(2026, 8, 26), true });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Date", "UserId" },
                values: new object[] { new DateOnly(2026, 8, 26), 1 });

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Date", "MedsTaken", "MoodScore", "SleepScore" },
                values: new object[] { new DateOnly(2026, 8, 26), true, 5, 3 });

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Date", "MedsTaken" },
                values: new object[] { new DateOnly(2026, 8, 27), false });

            migrationBuilder.InsertData(
                table: "MoodReports",
                columns: new[] { "Id", "Date", "MedsTaken", "MoodScore", "SleepScore", "UserId" },
                values: new object[] { 4, new DateOnly(2026, 8, 25), true, 3, 4, 2 });
        }
    }
}
