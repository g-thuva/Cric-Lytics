public class Match
{
    public int Id { get; set; }
    
    public string Teams { get; set; }  
    public string OppositeTeams { get; set; }
    public int TargetRun { get; set; }
    public int OurRun { get; set; }
    public DateTime MatchDate { get; set; }
    public string MatchPlace { get; set; }
    public string MatchResult { get; set; }
}
