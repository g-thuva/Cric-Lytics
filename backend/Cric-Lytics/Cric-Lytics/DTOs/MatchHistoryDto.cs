using System.ComponentModel.DataAnnotations;

namespace Cric_Lytics.DTOs
{
    public class MatchHistoryDto
    {
        public int Id { get; set; }

        [Required]
        public int PlayerId { get; set; }

        public string Opponent { get; set; }

        public DateTime Date { get; set; }

        public int Runs { get; set; }

        public int Wickets { get; set; }
    }
}
