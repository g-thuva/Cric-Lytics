using System.ComponentModel.DataAnnotations;

namespace CricLytics.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string  Username { get; set; } = string.Empty;
        public required string Password { get; set; } = string.Empty;
        public string ClubName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;  
        public required string Otp { get; set; }
    public DateTime OtpExpiration { get; set; }  // Time when OTP expires
    }
}
