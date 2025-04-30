using Microsoft.EntityFrameworkCore;
using cricketic.Models;

namespace cricketic.Data
{
    public class ApplicationDbContext : DbContext
    {
        // Constructor with DbContextOptions for dependency injection
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet properties for each of your models
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Sponsorship1> Sponsorship1 { get; set; }
        public DbSet<social_links> social_links { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Player> Players { get; set; }

       
    }
}

