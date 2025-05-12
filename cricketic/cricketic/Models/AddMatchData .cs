// Player Model
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
}

// OverData Model
public class OverData
{
    public int Id { get; set; }
    public int Overs { get; set; }
    public int RunsGiven { get; set; }
    public int WhiteBall { get; set; }
}

// MatchData Model (if needed for the API request)
public class MatchData
{
    public List<Player> Players { get; set; }
    public List<OverData> OversData { get; set; }
}
