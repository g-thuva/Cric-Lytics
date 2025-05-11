using Cric_Lytics.DTOs;
using Cric_Lytics.Models;

namespace Cric_Lytics.Services
{
    public interface IStatisticsService
    {
        Task<PlayerStatistics> GetPlayerStatisticsAsync(int playerId);
        Task<PlayerStatistics> UpdatePlayerStatisticsAsync(PlayerStatisticsDto statisticsDto);
    }
}
