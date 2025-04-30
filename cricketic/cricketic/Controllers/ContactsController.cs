using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cricketic.Models;
using cricketic.Data;

namespace cricketic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/contacts
        [HttpPost]
        public async Task<IActionResult> PostContact(Contact formData)
        {
            if (formData == null)
            {
                return BadRequest("Invalid data");
            }

            try
            {
                // Save data to the database
                _context.Contacts.Add(formData);
                await _context.SaveChangesAsync();

                return Ok(formData); // Return the saved data or a success message
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error saving data: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        // Optional: Get contacts (you can also use this to test the data)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return await _context.Contacts.ToListAsync();
        }
    }
}
