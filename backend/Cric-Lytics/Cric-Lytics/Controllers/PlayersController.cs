using Cric_Lytics.DTOs;
using Cric_Lytics.Models;
using Cric_Lytics.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cric_Lytics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly IFileService _fileService;
        private readonly ILogger<PlayersController> _logger;
        private readonly IWebHostEnvironment _environment;
        public PlayersController(IPlayerService playerService,
            IFileService fileService,
            ILogger<PlayersController> logger,
            IWebHostEnvironment environment)
        {
            _playerService = playerService;
            _fileService = fileService;
            _logger = logger;
            _environment = environment;
        }

        // GET: api/Players
        [HttpGet]
        public async Task<IActionResult> GetPlayers([FromQuery] string search = null, [FromQuery] string role = null)
        {
            try
            {
                if (!string.IsNullOrEmpty(search) || !string.IsNullOrEmpty(role))
                {
                    var searchResults = await _playerService.SearchPlayersAsync(search, role);
                    return Ok(searchResults);
                }

                var players = await _playerService.GetAllPlayersAsync();
                return Ok(players);
            }
            catch (Exception ex)
            {
                //500 is an HTTP status code that represents "Internal Server Error".
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/Players/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayer(int id)
        {
            try
            {
                var player = await _playerService.GetPlayerByIdAsync(id);

                if (player == null)
                {
                    return NotFound();
                }

                return Ok(player);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }  

        // POST: api/Players
        [HttpPost]
        //[Authorize] 
        public async Task<ActionResult<Player>> CreatePlayer([FromForm] PlayerDto playerDto)
        {
            try
            {
                _logger.LogInformation("Creating new player...");

                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors);
                    return BadRequest(ModelState);
                }

                _logger.LogInformation("Processing image if present");
                string imageUrl = null;
                if (playerDto.Image != null && playerDto.Image.Length > 0)
                {
                    try
                    {
                        _logger.LogInformation($"Image details - Name: {playerDto.Image.FileName}, Size: {playerDto.Image.Length} bytes, Content-Type: {playerDto.Image.ContentType}");

                        // Log current directory and wwwroot path
                        var currentDir = Directory.GetCurrentDirectory();
                        var webRootPath = _environment.WebRootPath ?? Path.Combine(currentDir, "wwwroot");

                        _logger.LogInformation($"Current directory: {currentDir}");
                        _logger.LogInformation($"WebRootPath: {webRootPath}");
                        _logger.LogInformation($"wwwroot exists: {Directory.Exists(webRootPath)}");

                        imageUrl = await _fileService.SaveImageAsync(playerDto.Image);

                        if (string.IsNullOrEmpty(imageUrl))
                        {
                            _logger.LogWarning("Image processing failed but continuing without image");
                        }
                        else
                        {
                            _logger.LogInformation($"Image saved successfully at: {imageUrl}");
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error processing image, continuing without image");
                    }
                }
                else
                {
                    _logger.LogInformation("No image provided or image is empty");
                }
                playerDto.ImageUrl = imageUrl;
                var createdPlayer = await _playerService.CreatePlayerAsync(playerDto);
                _logger.LogInformation($"Player created with ID: {createdPlayer.Id}");
                return CreatedAtAction(nameof(GetPlayer), new { id = createdPlayer.Id }, createdPlayer);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception creating player: {ex.Message}\n{ex.StackTrace}");
                _logger.LogError(ex, "Detailed error creating player: {Message}\nStackTrace: {StackTrace}",
                    ex.Message, ex.StackTrace);

                return StatusCode(500, new
                {
                    Error = "An error occurred while creating the player",
                    Details = ex.Message,
                    StackTrace = ex.StackTrace
                });
            }
        }

        // PUT: api/Players/5
        [HttpPut("{id}")]
        //[Authorize]
        public async Task<IActionResult> UpdatePlayer(int id, [FromForm] PlayerDto playerDto)
        {
            try
            {

                var existingPlayer = await _playerService.GetPlayerByIdAsync(id);
                if (existingPlayer == null)
                {
                    return NotFound($"Player with ID {id} not found");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (playerDto.Image != null && playerDto.Image.Length > 0)
                {
                    try
                    {
                        var newImageUrl = await _fileService.SaveImageAsync(playerDto.Image);
                        _logger.LogInformation($"New image saved at: {newImageUrl}");

                        if (!string.IsNullOrEmpty(existingPlayer.ImageUrl))
                        {
                            var oldImagePath = Path.Combine(_environment.WebRootPath, existingPlayer.ImageUrl.TrimStart('/'));
                            if (System.IO.File.Exists(oldImagePath))
                            {
                                System.IO.File.Delete(oldImagePath);
                                _logger.LogInformation($"Deleted old image: {oldImagePath}");
                            }
                        }
                        playerDto.ImageUrl = newImageUrl;
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error processing image");
                        // Fall back to existing image if update fails
                        playerDto.ImageUrl = existingPlayer.ImageUrl;
                    }
                }

                else
                {
                    Console.WriteLine("No new image uploaded, using existing image URL.");
                    playerDto.ImageUrl = existingPlayer.ImageUrl;
                }

                var updatedPlayer = await _playerService.UpdatePlayerAsync(id, playerDto);



                if (updatedPlayer == null)
                {
                    return NotFound($"Player with ID {id} not found");
                }

                return Ok(updatedPlayer);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating player ID: {PlayerId}", id);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        // [Authorize]
        public async Task<IActionResult> DeletePlayer(int id)
        {
            try
            {
                var result = await _playerService.DeletePlayerAsync(id);

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
