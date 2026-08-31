using Backend.DTOs.MoodReport;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoodReportController : ControllerBase
    {
        private readonly IMoodReportService moodReportService;
        private readonly IUserService userService;

        public MoodReportController(IMoodReportService _moodReportService, IUserService _userService)
        {
            moodReportService = _moodReportService;
            userService = _userService;
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<DisplayMoodReportDTO>>> GetMoodReportsForUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(userId, out int id))
            {
                return BadRequest(new { message = "Invalid user ID" });
            }

            var moodReports = await moodReportService.GetMoodReportsByUserIdAsync(id);

            if (moodReports == null)
            {
                return NotFound(new { message = "No mood reports found for the specified user" });
            }

            return Ok(moodReports);
        }
    }
}
