using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cricketic.Models;
using cricketic.Data;

namespace cricketic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Sponsorship1Controller : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public Sponsorship1Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/sponsorship1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sponsorship1>>> GetAll()
        {
            return await _context.Sponsorship1.ToListAsync();
        }

        // GET: api/sponsorship1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sponsorship1>> GetOne(int id)
        {
            var item = await _context.Sponsorship1.FindAsync(id);
            if (item == null)
                return NotFound();

            return item;
        }

        // POST: api/sponsorship1
        [HttpPost]
        public async Task<ActionResult<Sponsorship1>> Create(Sponsorship1 sponsor)
        {
            _context.Sponsorship1.Add(sponsor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetOne), new { id = sponsor.Id }, sponsor);
        }

        // PUT: api/sponsorship1/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Sponsorship1 sponsor)
        {
            if (id != sponsor.Id)
                return BadRequest();

            _context.Entry(sponsor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/sponsorship1/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sponsor = await _context.Sponsorship1.FindAsync(id);
            if (sponsor == null)
                return NotFound();

            _context.Sponsorship1.Remove(sponsor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
