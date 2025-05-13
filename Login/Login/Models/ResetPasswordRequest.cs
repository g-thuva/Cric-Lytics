public class ResetPasswordRequest
{
    public required string Username { get; set; }
    public required string NewPassword { get; set; }
    public required string ConfirmPassword { get; set; }
}
