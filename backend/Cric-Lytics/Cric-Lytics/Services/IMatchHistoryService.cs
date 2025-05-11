using Cric_Lytics.DTOs;
using Cric_Lytics.Models;

namespace Cric_Lytics.Services
{
    public interface IMatchHistoryService
    {
        Task<IEnumerable<MatchHistory>> GetPlayerMatchHistoryAsync(int playerId);
        Task<MatchHistory> AddMatchHistoryAsync(MatchHistoryDto matchHistoryDto);
        Task<bool> DeleteMatchHistoryAsync(int id);
    }
}
