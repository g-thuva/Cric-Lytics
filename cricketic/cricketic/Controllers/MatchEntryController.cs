using Microsoft.AspNetCore.Mvc;
using cricketic.Data;
using cricketic.Models;
using Microsoft.EntityFrameworkCore;

namespace cricketic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchEntryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MatchEntryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatchEntry>>> GetAll()
        {
            return await _context.MatchEntries.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MatchEntry>> GetById(int id)
        {
            var entry = await _context.MatchEntries.FindAsync(id);
            if (entry == null) return NotFound();
            return entry;
        }

        [HttpPost]
        public async Task<ActionResult> Create(MatchEntry entry)
        {
            _context.MatchEntries.Add(entry);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = entry.MatchId }, new
            {
                message = "Match entry submitted successfully!",
                data = entry
            });
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MatchEntry updated)
        {
            if (id != updated.MatchId) return BadRequest();
            _context.Entry(updated).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entry = await _context.MatchEntries.FindAsync(id);
            if (entry == null) return NotFound();
            _context.MatchEntries.Remove(entry);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
