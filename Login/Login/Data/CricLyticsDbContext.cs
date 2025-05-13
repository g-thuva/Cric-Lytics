using Microsoft.EntityFrameworkCore;
using CricLytics.Models;

namespace CricLytics.Data
{
    public class CricLyticsDbContext : DbContext
    {
        public CricLyticsDbContext(DbContextOptions<CricLyticsDbContext> options)
            : base(options)
        {
        }

        // Example DbSet (replace or add more as needed)
        public DbSet<User> Users { get; set; }
    }
}
