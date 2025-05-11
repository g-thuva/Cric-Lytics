using System.ComponentModel.DataAnnotations;

namespace Cric_Lytics.DTOs
{
    public class PlayerStatisticsDto
    {
        [Required]
        public int PlayerId { get; set; }

        public int Matches { get; set; }

        public int Runs { get; set; }

        public decimal Average { get; set; }

        public int Centuries { get; set; }

        public int Wickets { get; set; }

        public decimal Economy { get; set; }
    }
}
