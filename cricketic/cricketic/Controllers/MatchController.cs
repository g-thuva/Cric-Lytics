using Microsoft.AspNetCore.Mvc;
using cricketic.Models;
using cricketic.Data;
using System.Linq;

namespace cricketic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MatchController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Match
        [HttpPost]
        public async Task<IActionResult> PostMatch([FromBody] MatchDetails match)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new 
                { 
                    message = "Invalid input data", 
                    errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                });
            }

            try
            {
                await _context.MatchDetails.AddAsync(match);
                await _context.SaveChangesAsync();

                return Ok(new 
                { 
                    message = "Match data submitted successfully", 
                    data = match 
                });
            }
            catch (Exception ex)
            {
                // Log the error (optional: use a logging library)
                Console.WriteLine($"Error occurred: {ex.Message}");
                
                return StatusCode(500, new 
                { 
                    message = "An error occurred while saving match data.", 
                    error = ex.Message 
                });
            }

            
        }
    }
}
