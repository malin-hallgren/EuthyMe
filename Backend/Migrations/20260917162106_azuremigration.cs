using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class azuremigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Language",
                table: "Settings",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateOnly(2026, 9, 16));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateOnly(2026, 9, 15));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateOnly(2026, 9, 14));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 4,
                column: "Date",
                value: new DateOnly(2026, 9, 16));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 5,
                column: "Date",
                value: new DateOnly(2026, 9, 15));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 6,
                column: "Date",
                value: new DateOnly(2026, 9, 14));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Language",
                table: "Settings",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2)",
                oldMaxLength: 2);

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

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 4,
                column: "Date",
                value: new DateOnly(2026, 9, 10));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 5,
                column: "Date",
                value: new DateOnly(2026, 9, 9));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 6,
                column: "Date",
                value: new DateOnly(2026, 9, 8));
        }
    }
}
