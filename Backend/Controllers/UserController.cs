using Backend.DTOs.User;
using Backend.Models;
using Backend.Services;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService _userService)
        {
           userService = _userService;
        }


        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<(IEnumerable<UserActivityDTO>?, IEnumerable<UserActivityDTO>?)>> GetUsers()
        {
            var result = await userService.GetUsersAsync();
            return Ok(new { activeUsers = result.activeUsers, inactiveUsers = result.inactiveUsers });
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO registerUser)
        {
            var result = await userService.RegisterUserAsync(registerUser);

            if(!result.isSuccess)
            {
                return BadRequest(result.message);
            }

            return Created("", new {message = result.message});
        }

        [HttpGet]
        [Route("dashboard")]
        public async Task<IActionResult> GetDashboard([FromBody] int days = 7)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(!int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var result = await userService.GetDashboardUser(userId, days);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{userId:int}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteUser([FromRoute] int userId)
        {
            var result = await userService.DeleteUserAsync(userId);
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
