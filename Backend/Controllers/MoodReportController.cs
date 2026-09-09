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

        //Update this to have a Take() to get only the appropriate number of reports
        //based on the settings in the graph 
        [HttpGet]
        [Authorize(Policy = "UserOnly")] 
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

        [HttpPost]
        [Authorize(Policy = "UserOnly")]
        public async Task<ActionResult> CreateMoodReport([FromBody] CreateMoodReportDTO createMoodReportDTO)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userId, out int id))
            {
                return BadRequest(new { message = "Invalid user ID" });
            }
            var user = await userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }
            var moodReport = await moodReportService.CreateMoodReportAsync(id, createMoodReportDTO);
            if (!moodReport.isSuccess)
            {
                return BadRequest(new { message = moodReport.message });
            }
            return Created("", new { message = moodReport.message });
        }

        [HttpGet]
        [Authorize(Policy = "UserOnly")]
        [Route("refresh")]
        public async Task<ActionResult<List<DashboardMoodReportDTO>>> RefreshMoodReportsForUser(int days = 7)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userId, out int id))
            {
                return BadRequest(new { message = "Invalid user ID" });
            }
            var moodReports = await moodReportService.GetMoodReportsForDashboardAsync(id, days);
            if (moodReports == null)
            {
                return NotFound(new { message = "No mood reports found for the specified user" });
            }
            return Ok(moodReports);
        }
    }
}
