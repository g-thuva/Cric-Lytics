using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CricLytics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // Only accessible with a valid JWT token
        [Authorize]
        [HttpGet("me")]
        public IActionResult GetUserInfo()
        {
            return Ok(new { Username = "testUser", Name = "Test User" });
        }
    }
}
