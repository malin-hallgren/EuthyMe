using Backend.Models;

namespace Backend.Services.IServices
{
    public interface ITokenService
    {
        Task<string> GenerateJwtToken(User user);
    }
}
