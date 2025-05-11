using Cric_Lytics.DTOs;
using Cric_Lytics.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cric_Lytics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchHistoryController : ControllerBase
    {
        private readonly IMatchHistoryService _matchHistoryService;

        public MatchHistoryController(IMatchHistoryService matchHistoryService)
        {
            _matchHistoryService = matchHistoryService;
        }

        // GET: api/MatchHistory/player/5
        [HttpGet("player/{playerId}")]
        public async Task<IActionResult> GetPlayerMatchHistory(int playerId)
        {
            try
            {
                var matchHistory = await _matchHistoryService.GetPlayerMatchHistoryAsync(playerId);
                return Ok(matchHistory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/MatchHistory
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddMatchHistory(MatchHistoryDto matchHistoryDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var addedMatch = await _matchHistoryService.AddMatchHistoryAsync(matchHistoryDto);

                if (addedMatch == null)
                {
                    return NotFound("Player not found");
                }

                return CreatedAtAction(nameof(GetPlayerMatchHistory), new { playerId = matchHistoryDto.PlayerId }, addedMatch);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/MatchHistory/5
        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<IActionResult> DeleteMatchHistory(int id)
        {
            try
            {
                var result = await _matchHistoryService.DeleteMatchHistoryAsync(id);

                if (!result)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
