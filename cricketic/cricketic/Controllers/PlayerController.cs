using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class MatchController : ControllerBase
{
    [HttpPost("matchdata")]
    public async Task<IActionResult> SubmitMatchData([FromBody] MatchData matchData)
    {
        if (matchData == null)
        {
            return BadRequest("Match data is required");
        }

        try
        {
            // Process the match data here (e.g., save to database)
            // For example, you can add code here to save matchData.Players and matchData.OversData to your database.

            // Returning a success response
            return Ok("Match data submitted successfully");
        }
        catch (Exception ex)
        {
            // Handle any errors that may occur
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
