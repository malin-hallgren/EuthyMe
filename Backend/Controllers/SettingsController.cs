using Backend.DTOs.Settings;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService settingsService;
        private readonly IUserService userService;

        public SettingsController(ISettingsService _settingsService, IUserService _userService)
        {
            settingsService = _settingsService;
            userService = _userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSettings()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            return Ok(await settingsService.GetSettingsForUserId(userId));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSettings([FromBody] SettingsInDTO settings)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var result = await settingsService.UpdateSettingsForUserId(userId, settings);
            if (result.status != HttpStatusCode.OK)
            {
                return BadRequest(result.message);
            }
            return Ok(new { message = result.message });
        }
    }
}
