using Backend.DTOs.User;
using Backend.Models;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly IUserService userService;

        public UserController(UserManager<User> _userManager, IUserService _userService)
        {
           userManager = _userManager;
           userService = _userService;
        }


        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<IEnumerable<DisplayUserDTO>>> GetUsers()
        {
            var users = await userService.GetUsersAsync();
            return Ok(users);
        }
    }
}
