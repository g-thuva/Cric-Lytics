namespace cricketic.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public int Runs { get; set; }
        public int Wickets { get; set; }
        public int Balls { get; set; }
        public int Fours { get; set; }
        public int Sixes { get; set; }
        public int BallsFaced { get; set; }
        public string Suggestions { get; set; }
        public string OutStatus { get; set; }
        public string OutType { get; set; }
        public string RunOutReason { get; set; }
        public string Fielder { get; set; }

        public int MatchId { get; set; } // Foreign Key
        public Match Match { get; set; } // Navigation property
    }
}
