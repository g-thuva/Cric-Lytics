using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalWebapi.Models
{
    public class PlayerPerformance
    {
        [Key]
        public int PerformanceID { get; set; }

        // Foreign key to MatchEntry (but no navigation property)
        [Required]
        public string MatchCode { get; set; }

        [Required]
        public string PlayerID { get; set; }

        [Required]
        public string PlayerName { get; set; }


        public int BattingPosition { get; set; }

        public int Runs { get; set; }

        public int BallsFaced { get; set; }

        public int Sixes { get; set; }

        public int Fours { get; set; }

        public bool IsOut { get; set; }

        public string? OutMethod { get; set; }

        public string? Fielder1 { get; set; }

        public string? Fielder2 { get; set; }

        public string? Bowler { get; set; }

        public string? OutOverBall { get; set; }
        public string? TotalBall { get; set; }
        public string? TotalWicket { get; set; }




        // New Record field (as varchar equivalent)
        public string? Record { get; set; }
    }
}
