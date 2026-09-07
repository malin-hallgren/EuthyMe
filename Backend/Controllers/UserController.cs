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
        public async Task<ActionResult<IEnumerable<DisplayUserDTO>>> GetUsers()
        {
            var users = await userService.GetUsersAsync();
            return Ok(users);
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
        public async Task<IActionResult> GetDashboard()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(!int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var result = await userService.GetDashboardUser(userId, 7);
            return Ok(result);
        }
    }
}
