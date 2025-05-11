using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Cric_Lytics.Models
{
    public class PlayerStatistics
    {
        [Key]
        [ForeignKey("Player")]
        public int PlayerId { get; set; }

        public int Matches { get; set; }

        public int Runs { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal Average { get; set; }

        public int Centuries { get; set; }

        public int Wickets { get; set; }

        [Column(TypeName = "decimal(4, 2)")]
        public decimal Economy { get; set; }

        public virtual Player Player { get; set; }
    }
}
