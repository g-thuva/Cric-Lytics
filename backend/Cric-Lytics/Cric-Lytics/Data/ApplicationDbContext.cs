using Cric_Lytics.Models;
using Microsoft.EntityFrameworkCore;

namespace Cric_Lytics.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Player> Players { get; set; }
        public DbSet<PlayerStatistics> PlayerStatistics { get; set; }
        public DbSet<MatchHistory> MatchHistory { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure one-to-one relationship between Player and PlayerStatistics
            modelBuilder.Entity<Player>()
                .HasOne(p => p.Statistics)
                .WithOne(s => s.Player)
                .HasForeignKey<PlayerStatistics>(s => s.PlayerId);

            // Configure one-to-many relationship between Player and MatchHistory
            modelBuilder.Entity<Player>()
                .HasMany(p => p.MatchHistory)
                .WithOne(m => m.Player)
                .HasForeignKey(m => m.PlayerId);

            // Configure unique constraint for user email
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
