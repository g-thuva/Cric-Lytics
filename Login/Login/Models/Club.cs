public class Club
{
    public int Id { get; set; }
    public required string ClubName { get; set; }
    public required string ContactNumber { get; set; }
    public required string Username { get; set; }
    public required string PasswordHash { get; set; } // store hash, not plain password
}
