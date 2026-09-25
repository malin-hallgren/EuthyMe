using Backend.DTOs.Password;
using Backend.DTOs.User;
using Backend.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using System.Text;


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

            if (result.status != HttpStatusCode.OK)
            {
                return BadRequest(new { message = result.errors });
            }

            var options = await authService.GetCookieOptionsAsync();
            Response.Cookies.Append("auth_token", result.token!, options);

            return Ok(new
            {
                role = result.role.ToUpper(),
                message = $"Logged in user {logInUser.UserName}"
            });
        }

        [HttpPost]
        [Route("logout")]
        public async Task<ActionResult> Logout()
        {
            var options = await authService.GetCookieOptionsAsync();
            Response.Cookies.Delete("auth_token", options);

            return Ok();
        }

        [HttpGet]
        [Route("status")]
        public async Task<IActionResult> Status()
        {
            var result = await authService.IsUserAuthenticatedAsync(HttpContext);

            return Ok(new { isAuthenticated = result.isAuthenticated, role = result.message });
        }

        [HttpPost]
        [Route("update/password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordDTO updatePassword)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var result = await authService.UpdateUserPasswordAsync(userId, updatePassword);
            if (result == HttpStatusCode.BadRequest)
            {
                return BadRequest(new { message = "ERR_INVALID_CREDENTIALS_PW_UPDATE"});
            }
            else if ( result == HttpStatusCode.NotFound)
            {
                return NotFound();
            }

            return Ok(new {message = "SUC_PASSWORD_UPDATED"});
        }

    }
}
