using Cric_Lytics.DTOs;
using Cric_Lytics.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cric_Lytics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        // GET: api/Statistics/player/5
        [HttpGet("player/{playerId}")]
        public async Task<IActionResult> GetPlayerStatistics(int playerId)
        {
            try
            {
                var playerStats = await _statisticsService.GetPlayerStatisticsAsync(playerId);

                if (playerStats == null)
                {
                    return NotFound();
                }

                return Ok(playerStats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/Statistics
        [HttpPut]
        //[Authorize]
        public async Task<IActionResult> UpdatePlayerStatistics(PlayerStatisticsDto statisticsDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedStats = await _statisticsService.UpdatePlayerStatisticsAsync(statisticsDto);

                if (updatedStats == null)
                {
                    return NotFound();
                }

                return Ok(updatedStats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
