using Microsoft.EntityFrameworkCore;
using cricketic.Models;
using FinalWebapi.Models;

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
        public DbSet<MatchDetails> MatchDetails { get; set; }
        public DbSet<OppositeMatchData> OppositeMatchData { get; set; }
        public DbSet<MatchEntry> MatchEntries { get; set; }
        public DbSet<BowlingOverPerformance> BowlingOverPerformances { get; set; }
        public DbSet<PlayerPerformance> PlayerPerformances { get; set; }
        public DbSet<BowlingOverPerformance1> BowlingOverPerformances1 { get; set; }
        public DbSet<PlayerPerformance1> PlayerPerformances1 { get; set; }






       
    }
}

