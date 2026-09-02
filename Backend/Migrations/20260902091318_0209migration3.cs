using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class _0209migration3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateOnly(2026, 9, 2));

            migrationBuilder.UpdateData(
                table: "MoodReports",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateOnly(2026, 8, 31));
        }
    }
}
