using Cric_Lytics.Data;
using Cric_Lytics.DTOs;
using Cric_Lytics.Models;
using Microsoft.EntityFrameworkCore;

namespace Cric_Lytics.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly ApplicationDbContext _context;

        public StatisticsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PlayerStatistics> GetPlayerStatisticsAsync(int playerId)
        {
            return await _context.PlayerStatistics
                .FirstOrDefaultAsync(s => s.PlayerId == playerId);
        }

        public async Task<PlayerStatistics> UpdatePlayerStatisticsAsync(PlayerStatisticsDto statisticsDto)
        {
            var statistics = await _context.PlayerStatistics
                .FirstOrDefaultAsync(s => s.PlayerId == statisticsDto.PlayerId);

            if (statistics == null)
            {
                return null;
            }

            statistics.Matches = statisticsDto.Matches;
            statistics.Runs = statisticsDto.Runs;
            statistics.Average = statisticsDto.Average;
            statistics.Centuries = statisticsDto.Centuries;
            statistics.Wickets = statisticsDto.Wickets;
            statistics.Economy = statisticsDto.Economy;

            _context.Entry(statistics).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return statistics;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Failed to update player statistics", ex);
            }

        }
    }
}
