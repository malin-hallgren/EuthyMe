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
                return BadRequest(result.errors);
            }

            return Ok(new { Token = result.token });
        }
    }
}
