using System.ComponentModel.DataAnnotations;

namespace FinalWebapi.Models
{
    public class BowlingOverPerformance1
    {
        [Key]
        public int OverPerformanceID { get; set; }

        [Required]
        public string MatchCode { get; set; }  // Foreign key (e.g., "MCH001")

        [Required]
        public string PlayerID { get; set; }  // Bowler ID (e.g., "PL007")

        [Required]
        public string PlayerName { get; set; }  // Bowler's name

        [Required]
        public int OverNumber { get; set; }  // 1, 2, 3, etc.

        [Required]
        public int RunsInOver { get; set; }  // Total runs conceded in this over
        
        [Required]
        public int ExtrasInOver { get; set; }  // Extras in this over

        public string? WicketBalls { get; set; }  // e.g., "4.5, 5.2"
    }
}
