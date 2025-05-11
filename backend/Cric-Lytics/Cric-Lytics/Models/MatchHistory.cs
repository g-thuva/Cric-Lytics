using System.ComponentModel.DataAnnotations;

namespace Cric_Lytics.Models
{
    public class MatchHistory
    {
        public int Id { get; set; }

        public int PlayerId { get; set; }

        public string Opponent { get; set; }

        public DateTime Date { get; set; }

        public int Runs { get; set; }

        public int Wickets { get; set; }

        public virtual Player Player { get; set; }
    }
}
