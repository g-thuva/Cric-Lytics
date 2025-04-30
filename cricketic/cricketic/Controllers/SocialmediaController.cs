using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cricketic.Models;
using cricketic.Data;

namespace cricketic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SocialLinksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SocialLinksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/sociallinks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<social_links>>> GetAll()
        {
            return await _context.social_links.ToListAsync();
        }

        // GET: api/sociallinks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<social_links>> GetOne(int id)
        {
            var item = await _context.social_links.FindAsync(id);
            if (item == null)
                return NotFound();

            return item;
        }

        // POST: api/sociallinks
        [HttpPost]
        public async Task<ActionResult<social_links>> Create(social_links link)
        {
            _context.social_links.Add(link);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetOne), new { id = link.Id }, link);
        }

        // PUT: api/sociallinks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, social_links link)
        {
            if (id != link.Id)
                return BadRequest();

            _context.Entry(link).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/sociallinks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var link = await _context.social_links.FindAsync(id);
            if (link == null)
                return NotFound();

            _context.social_links.Remove(link);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
