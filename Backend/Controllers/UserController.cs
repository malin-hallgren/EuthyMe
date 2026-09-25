using Backend.DTOs.User;
using Backend.Models;
using Backend.Services;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
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
            if (result.activeUsers == null || result.inactiveUsers == null)
            {
                return NoContent();
            }
            return Ok(new { activeUsers = result.activeUsers, inactiveUsers = result.inactiveUsers });
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO registerUser)
        {
            var result = await userService.RegisterUserAsync(registerUser);

            if(result.status == HttpStatusCode.Created)
            {
                return Created("", new { message = result.message });
            }
            else if(result.status == HttpStatusCode.Conflict)
            {
                return Conflict(result.message);
            }
            else 
            {
                return BadRequest(result.message);
            }
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
            if (result == HttpStatusCode.NotFound)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
