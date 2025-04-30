namespace cricketic.Models
{
    public class MatchWithPlayers
    {
        public Match Match { get; set; } // Match details
        public List<Player> Players { get; set; } // List of players for the match
    }
}
