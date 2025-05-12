using System;
using System.ComponentModel.DataAnnotations;

public enum TossResultEnum
{
    Won = 0,
    Lost = 1
}


public enum MatchStatusEnum
{
    Won = 0,
    Lost = 1,
    Draw = 2
}

public enum MatchTypeEnum
{
    T20 = 0,
    Test = 1,
    ODI = 2
}

public enum FirstInningsEnum
{
    Batting = 0,
    Bowling = 1
}

public class MatchEntry
{
    [Key]
    public int MatchId { get; set; }

    public string MatchCode { get; set; }
    public DateTime MatchDate { get; set; }
    public string OppositeTeamName { get; set; }
    public TossResultEnum TossResult { get; set; }
    public FirstInningsEnum FirstInnings { get; set; } // Enum for first choice (Batting/Bowling)
   
    public MatchStatusEnum MatchStatus { get; set; } // Enum for match status (Win/Lost/Draw)
    public string Venue { get; set; }
    public MatchTypeEnum MatchType { get; set; } // Enum for match type (T20/Test/ODI)
}
