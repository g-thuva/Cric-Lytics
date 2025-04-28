using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using cricketic.Models;
using cricketic.Data;

namespace cricketic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MatchController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("matchdata")]
        public async Task<IActionResult> matchdata([FromBody] MatchWithPlayers matchData)
        {
            if (matchData == null)
            {
                return BadRequest("Invalid data.");
            }

            try
            {
                // Save match details
                var match = new Match
                {
                    Teams = matchData.Match.Teams,
                    OppositeTeams = matchData.Match.OppositeTeams,
                    TargetRun = matchData.Match.TargetRun,
                    OurRun = matchData.Match.OurRun,
                    MatchDate = matchData.Match.MatchDate,
                    MatchPlace = matchData.Match.MatchPlace,
                    MatchResult = matchData.Match.MatchResult // Save match result here
                };
                _context.Matches.Add(match);
                await _context.SaveChangesAsync();  // Save match to get the generated match Id

                // Save player details
                foreach (var player in matchData.Players)
                {
                    var newPlayer = new Player
                    {
                        Name = player.Name,
                        Email = player.Email,
                        Role = player.Role,
                        Runs = player.Runs,
                        Wickets = player.Wickets,
                        Balls = player.Balls,
                        Fours = player.Fours,
                        Sixes = player.Sixes,
                        BallsFaced = player.BallsFaced,
                        Suggestions = player.Suggestions,
                        OutStatus = player.OutStatus,
                        OutType = player.OutType,
                        RunOutReason = player.RunOutReason,
                        Fielder = player.Fielder,
                        MatchId = match.Id // Link player to match via MatchId
                    };
                    _context.Players.Add(newPlayer);
                }

                await _context.SaveChangesAsync();  // Save player details to the database

                return Ok("Match and player details saved successfully.");
            }
            catch (Exception ex)
            {
                // Log the error and return a failure message
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
