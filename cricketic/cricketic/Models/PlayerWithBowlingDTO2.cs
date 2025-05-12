
namespace FinalWebapi.Models
{
    public class PlayerWithBowlingDTO2
    {
        public string MatchCode { get; set; }    // Match identifier (e.g., "MCH001")
        public string PlayerID { get; set; }      // Player identifier (e.g., "PL007")
        public string PlayerName { get; set; }    // Player's name
        public int BattingPosition { get; set; }  // Player's batting position
        public int Runs { get; set; }          // Runs scored by the player
        public int BallsFaced { get; set; }    // Balls faced by the player
        public int Fours { get; set; }         // Fours hit by the player
        public int  Sixes { get; set; }        // Sixers hit by the player

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
        public List<BowlingOverDTO2> BowlingOvers1 { get; set; } // List of bowling overs for the player
    }

    public class BowlingOverDTO2
    {
        public int OverNumber { get; set; }  // Over number (e.g., 1, 2, 3...)
        public int RunsInOver { get; set; }  // Runs conceded in the over
        public int ExtrasInOver { get; set; } // Extras in the over
        public string WicketBalls { get; set; } // Wicket balls (e.g., "4.5, 5.2")
    }
}