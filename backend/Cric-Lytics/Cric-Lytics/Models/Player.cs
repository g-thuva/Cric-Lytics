using System.ComponentModel.DataAnnotations;

namespace Cric_Lytics.Models
{
    public class Player
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(200)]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int Age { get; set; }

        
        public string Role { get; set; }

        
        public string MedicalStatus { get; set; }

      
        public string BattingStyle { get; set; }

        public string BowlingStyle { get; set; }

        public string? ImageUrl { get; set; }

        public string Record { get; set; }

        public virtual PlayerStatistics Statistics { get; set; } //1-1

        public virtual ICollection<MatchHistory> MatchHistory { get; set; } //1-n
    }
}
