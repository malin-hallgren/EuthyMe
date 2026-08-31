using Backend.DTOs.User;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService _authService)
        {
            authService = _authService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LogInUser logInUser)
        {
            var result = await authService.AuthenticateUserAsync(logInUser);

            if (!result.isSuccess)
            {
                return BadRequest(new { message = result.errors });
            }

            var options = await authService.GetCookieOptionsAsync();
            Response.Cookies.Append("auth_token", result.token!, options);

            return Ok(new
            {
                message = $"Logged in user {logInUser.UserName}"
            });
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            var options = await authService.GetCookieOptionsAsync();
            Response.Cookies.Delete("auth_token", options);

            return Ok(new
            {
                message = "Logged out successfully"
            });
        }
    }
}
