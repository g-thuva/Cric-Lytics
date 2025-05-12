
using Microsoft.AspNetCore.Mvc;
using FinalWebapi.Models; // Adjust namespace if needed
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using cricketic.Data;

namespace cricketic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerformanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PerformanceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ------------------ PLAYER PERFORMANCE -------------------

        [HttpGet("player")]
        public async Task<ActionResult<IEnumerable<PlayerPerformance>>> GetAllPlayerPerformances()
        {
            return await _context.PlayerPerformances.ToListAsync();
        }

        [HttpPost("player")]
        public async Task<ActionResult<PlayerPerformance>> AddPlayerPerformance(PlayerPerformance performance)
        {
            _context.PlayerPerformances.Add(performance);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAllPlayerPerformances), new { id = performance.PerformanceID }, performance);
        }

        // New POST route to add multiple players
        [HttpPost("player/multiple")]
        public async Task<ActionResult<IEnumerable<PlayerPerformance>>> AddMultiplePlayerPerformances([FromBody] List<PlayerPerformance> performances)
        {
            if (performances == null || performances.Count == 0)
                return BadRequest("No players submitted.");

            _context.PlayerPerformances.AddRange(performances);
            await _context.SaveChangesAsync();

            // Return a response with the added players (or just return an OK status if you prefer)
            return Ok(performances);
        }

        // ------------------ BOWLING OVER PERFORMANCE -------------------

        [HttpGet("bowling")]
        public async Task<ActionResult<IEnumerable<BowlingOverPerformance>>> GetAllBowlingPerformances()
        {
            return await _context.BowlingOverPerformances.ToListAsync();
        }

        [HttpPost("bowling")]
        public async Task<ActionResult<BowlingOverPerformance>> AddBowlingPerformance(BowlingOverPerformance performance)
        {
            _context.BowlingOverPerformances.Add(performance);
            await _context.SaveChangesAsync();
            return Created("api/performance/bowling", performance);
        }

        // New POST route to add multiple overs for multiple players
        [HttpPost("playerWithBowling")]
        public async Task<ActionResult> AddPlayerWithBowling([FromBody] List<PlayerWithBowlingDTO> playerWithBowlingData)
        {
            if (playerWithBowlingData == null || playerWithBowlingData.Count == 0)
                return BadRequest("No players with overs submitted.");

            foreach (var data in playerWithBowlingData)
            {
                // Add Player Performance
                var playerPerformance = new PlayerPerformance
                {
                    MatchCode = data.MatchCode,
                    PlayerID = data.PlayerID,
                    PlayerName = data.PlayerName,
                    BattingPosition = data.BattingPosition,
                    Runs = data.Runs,
                    BallsFaced = data.BallsFaced,
                    Fours = data.Fours,
                    Sixes = data.Sixes,
                    IsOut = data.IsOut,
                    OutMethod=data.OutMethod,
                    Fielder1=data.Fielder1,
                    Fielder2=data.Fielder2,
                    Bowler=data.Bowler,
                    OutOverBall=data.OutOverBall,
                    TotalBall=data.TotalBall,
                    TotalWicket=data.TotalWicket,
                    Record=data.Record





        // Add other properties if needed
    };

                _context.PlayerPerformances.Add(playerPerformance);
                await _context.SaveChangesAsync();

                // Add Bowling Over Performance
                foreach (var over in data.BowlingOvers)
                {
                    var bowlingOverPerformance = new BowlingOverPerformance
                    {
                        MatchCode = data.MatchCode,
                        PlayerID = data.PlayerID,
                        PlayerName = data.PlayerName,
                        OverNumber = over.OverNumber,  // This should only be in the BowlingOverPerformance
                        RunsInOver = over.RunsInOver,
                        ExtrasInOver = over.ExtrasInOver,
                        WicketBalls = over.WicketBalls
                    };

                    _context.BowlingOverPerformances.Add(bowlingOverPerformance);
                }
            }

            await _context.SaveChangesAsync();
            return Ok("Players and bowling overs added successfully.");
        }
    }
}
