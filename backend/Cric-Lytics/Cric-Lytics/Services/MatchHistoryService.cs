using Cric_Lytics.Data;
using Cric_Lytics.DTOs;
using Cric_Lytics.Models;
using Microsoft.EntityFrameworkCore;

namespace Cric_Lytics.Services
{
    public class MatchHistoryService : IMatchHistoryService
    {
        private readonly ApplicationDbContext _context;

        public MatchHistoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MatchHistory>> GetPlayerMatchHistoryAsync(int playerId)
        {
            try
            {
                return await _context.MatchHistory
                    .Where(m => m.PlayerId == playerId)
                    .OrderByDescending(m => m.Date)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching match history for player {playerId}: {ex.Message}");
                return new List<MatchHistory>(); // Return empty list if error occurs
            }
        }


        public async Task<MatchHistory> AddMatchHistoryAsync(MatchHistoryDto matchHistoryDto)
        {
            try
            {
                var player = await _context.Players.FindAsync(matchHistoryDto.PlayerId);

                if (player == null)
                {
                    Console.WriteLine($"Player with ID {matchHistoryDto.PlayerId} not found.");
                    return null;
                }

                var matchHistory = new MatchHistory
                {
                    PlayerId = matchHistoryDto.PlayerId,
                    Opponent = matchHistoryDto.Opponent,
                    Date = matchHistoryDto.Date,
                    Runs = matchHistoryDto.Runs,
                    Wickets = matchHistoryDto.Wickets
                };

                _context.MatchHistory.Add(matchHistory);
                await _context.SaveChangesAsync();

                // Update player statistics
                var playerStats = await _context.PlayerStatistics.FindAsync(matchHistoryDto.PlayerId);

                if (playerStats != null)
                {
                    playerStats.Matches++;
                    playerStats.Runs += matchHistoryDto.Runs;
                    playerStats.Wickets += matchHistoryDto.Wickets;

                    // Recalculate average
                    if (playerStats.Matches > 0)
                    {
                        playerStats.Average = (decimal)playerStats.Runs / playerStats.Matches;
                        playerStats.Economy = playerStats.Wickets > 0
                            ? (decimal)playerStats.Runs / playerStats.Wickets
                            : 0;
                    }

                    await _context.SaveChangesAsync();
                }

                return matchHistory;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding match history for player {matchHistoryDto.PlayerId}: {ex.Message}");
                return null;
            }
        }


        public async Task<bool> DeleteMatchHistoryAsync(int id)
        {
            try
            {
                var matchHistory = await _context.MatchHistory.FindAsync(id);

                if (matchHistory == null)
                {
                    return false; // Match history not found
                }

                // Update player statistics before deleting match history
                var playerStats = await _context.PlayerStatistics.FindAsync(matchHistory.PlayerId);

                if (playerStats != null)
                {
                    playerStats.Matches = Math.Max(0, playerStats.Matches - 1);
                    playerStats.Runs = Math.Max(0, playerStats.Runs - matchHistory.Runs);
                    playerStats.Wickets = Math.Max(0, playerStats.Wickets - matchHistory.Wickets);

                    if (playerStats.Matches > 0)
                    {
                        playerStats.Average = (decimal)playerStats.Runs / playerStats.Matches;
                        playerStats.Economy = playerStats.Wickets > 0
                            ? (decimal)playerStats.Runs / playerStats.Wickets
                            : 0;
                    }
                    else
                    {
                        playerStats.Average = 0;
                        playerStats.Economy = 0;
                    }
                }

                _context.MatchHistory.Remove(matchHistory);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting match history: {ex.Message}");
                return false;
            }
        }

    }
}
