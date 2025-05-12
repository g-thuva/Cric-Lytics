public class OppositeMatchData
{
    public int Id { get; set; }  // Primary key for the entity
    public string MatchName { get; set; }
    public string MatchCode { get; set; }
    public string InicsT { get; set; }
    public string TossResult { get; set; }
    public string FirstChoice { get; set; }
    public string Teams { get; set; }
    public string OppositeTeams { get; set; }
    public int OurRun { get; set; }
    public DateTime MatchDate { get; set; }
    public string MatchPlace { get; set; }
    public string MatchResult { get; set; }
}
