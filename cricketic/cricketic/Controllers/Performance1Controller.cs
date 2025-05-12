using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OppositePlayerController : ControllerBase
    {
        [HttpPost("playerWithBowling1")]
        public IActionResult PostOppositePlayers([FromBody] List<PlayerWithBowling1> players)
        {
            if (players == null || players.Count == 0)
            {
                return BadRequest("No player data received.");
            }

            foreach (var player in players)
            {
                Console.WriteLine($"MatchCode: {player.MatchCode}");
                Console.WriteLine($"PlayerId: {player.PlayerId}");
                Console.WriteLine($"PlayerName: {player.PlayerName}");
                Console.WriteLine($"Runs: {player.Runs}, Wickets: {player.TotalWicket}");

                if (player.BowlingOvers != null && player.BowlingOvers.Count > 0)
                {
                    foreach (var over in player.BowlingOvers)
                    {
                        Console.WriteLine($"  Over: {over.OverNumber}, Runs: {over.RunsInOver}, Extras: {over.ExtrasInOver}, WicketBalls: {over.WicketBalls}");
                    }
                }
                else
                {
                    Console.WriteLine("  No bowling overs recorded.");
                }
            }

            return Ok("Players added successfully.");
        }
    }

    public class PlayerWithBowling1
    {
        public string MatchCode { get; set; }
        public string PlayerId { get; set; }
        public string PlayerName { get; set; }
        public int? Runs { get; set; }
        public int? Sixers { get; set; }
        public int? Fours { get; set; }
        public int? TotalWicket { get; set; }
        public int? TotalBall { get; set; }
        public int? BallsFaced { get; set; }
        public bool IsOut { get; set; }
        public int BattingPosition { get; set; }
        public string? OutType { get; set; }
        public string? OutOverBall { get; set; }
        public string? Bowler { get; set; }
        public string? Fielder1 { get; set; }
        public string? Fielder2 { get; set; }
        public string? Record { get; set; }
        public List<BowlingOver1> BowlingOvers { get; set; } = new(); // avoid null
    }

    public class BowlingOver1
    {
        public int OverNumber { get; set; }
        public int RunsInOver { get; set; }
        public int ExtrasInOver { get; set; }
        public string WicketBalls { get; set; }
    }
}
