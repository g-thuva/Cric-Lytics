using Cric_Lytics.Data;
using Cric_Lytics.DTOs;
using Cric_Lytics.Models;
using Microsoft.EntityFrameworkCore;

namespace Cric_Lytics.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PlayerService> _logger;

        public PlayerService(ApplicationDbContext context, ILogger<PlayerService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Player>> GetAllPlayersAsync()
        {
            return await _context.Players
                .Include(p => p.Statistics)
                .ToListAsync();
        }

        public async Task<Player> GetPlayerByIdAsync(int id)
        {
            return await _context.Players
                .Include(p => p.Statistics)
                .Include(p => p.MatchHistory)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Player> CreatePlayerAsync(PlayerDto playerDto)
        {
            try
            {
                _logger.LogInformation(
                    "Creating player with values: Name={Name}, Email={Email}, DOB={DOB}, Role={Role}, BattingStyle={BattingStyle}",
                    playerDto.Name ?? "null",
                    playerDto.Email ?? "null",
                    playerDto.DateOfBirth,
                    playerDto.Role ?? "null",
                    playerDto.BattingStyle ?? "null"
                );

                // Validate core required fields
                if (string.IsNullOrWhiteSpace(playerDto.Name) ||
                    string.IsNullOrWhiteSpace(playerDto.Email) ||
                    playerDto.DateOfBirth == default ||
                    string.IsNullOrWhiteSpace(playerDto.Role) ||
                    string.IsNullOrWhiteSpace(playerDto.BattingStyle))
                {
                    _logger.LogWarning(
                       "Missing required fields: Name={NameMissing}, Email={EmailMissing}, DOB={DOBMissing}, Role={RoleMissing}, BattingStyle={BattingStyleMissing}",
                       string.IsNullOrWhiteSpace(playerDto.Name),
                       string.IsNullOrWhiteSpace(playerDto.Email),
                       playerDto.DateOfBirth == default,
                       string.IsNullOrWhiteSpace(playerDto.Role),
                       string.IsNullOrWhiteSpace(playerDto.BattingStyle)
                     );
                    throw new ArgumentException("Name, Email, DateOfBirth, Role, and BattingStyle are required");
                }

                _logger.LogInformation("Creating player from DTO: {Name}", playerDto.Name);
                
                var player = new Player
                {
                    Name = playerDto.Name,
                    FullName = playerDto.FullName ?? string.Empty,
                    Email = playerDto.Email,
                    DateOfBirth = playerDto.DateOfBirth,
                    Age = CalculateAge(playerDto.DateOfBirth),
                    Role = playerDto.Role,
                    MedicalStatus = playerDto.MedicalStatus ?? "Well",
                    BattingStyle = playerDto.BattingStyle ?? "Unknown",
                    BowlingStyle = playerDto.BowlingStyle ?? string.Empty,
                    ImageUrl = playerDto.ImageUrl ?? "/images/default-player.png",
                    Record = playerDto.Record ?? string.Empty,
                    MatchHistory = new List<MatchHistory>()
                };

                // Add to context
                _context.Players.Add(player);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Player created with ID: {Id}", player.Id);

                var statistics = new PlayerStatistics
                {
                    PlayerId = player.Id,
                    Matches = 0,
                    Runs = 0,
                    Average = 0,
                    Centuries = 0,
                    Wickets = 0,
                    Economy = 0
                };

                _logger.LogInformation("Adding statistics to context");

                _context.PlayerStatistics.Add(statistics);
                await _context.SaveChangesAsync();

                // Reload player with statistics
                return await GetPlayerByIdAsync(player.Id);
                               
            }
            catch (Exception ex){
                _logger.LogError(ex, "Error creating player");
                throw new ApplicationException("Failed to create player. Please check all required fields.", ex);
            }
        }


        public async Task<Player> UpdatePlayerAsync(int id, PlayerDto playerDto)
        {
            try
            {
                _logger.LogInformation("Updating player with ID: {Id}", id);
                var player = await _context.Players.FindAsync(id);
                if (player == null)
                {
                    _logger.LogWarning("Player with ID {Id} not found", id);
                    return null;
                }
                _logger.LogInformation("Current ImageUrl: {CurrentUrl}, New ImageUrl: {NewUrl}",
                player.ImageUrl, playerDto.ImageUrl);
                player.Name = playerDto.Name ?? player.Name;
                player.FullName = playerDto.FullName ?? player.FullName;
                player.Email = playerDto.Email ?? player.Email;

                if (!string.IsNullOrEmpty(playerDto.ImageUrl) && playerDto.ImageUrl != "string")
                {
                    _logger.LogInformation("Updating image URL to: {NewUrl}", playerDto.ImageUrl);
                    player.ImageUrl = playerDto.ImageUrl;
                }
                else
                {
                    _logger.LogInformation("Not updating image URL. Value was: {Value}", playerDto.ImageUrl ?? "null");
                }

                player.Role = playerDto.Role ?? player.Role;
                player.MedicalStatus = playerDto.MedicalStatus ?? player.MedicalStatus;
                player.BattingStyle = playerDto.BattingStyle ?? player.BattingStyle;
                player.BowlingStyle = playerDto.BowlingStyle ?? player.BowlingStyle;

               
                player.Record = playerDto.Record ?? player.Record; ;

                _context.Entry(player).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                _logger.LogInformation("Player with ID {Id} updated successfully", id);

                // Return the updated player with all related data
                return await GetPlayerByIdAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating player with ID: {Id}", id);
                throw;
            }
        }


        public async Task<bool> DeletePlayerAsync(int id)
        {
            try
            {
                var player = await _context.Players.FindAsync(id);
                if (player == null)
                {
                    return false;
                }

                _context.Players.Remove(player);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting player: {ex.Message}");
                return false;
            }
        }


        public async Task<IEnumerable<Player>> SearchPlayersAsync(string searchTerm, string role)
        {
            try
            {
                var query = _context.Players
                    .Include(p => p.Statistics)
                    .AsQueryable();

                if (!string.IsNullOrEmpty(searchTerm))
                {
                    query = query.Where(p => p.Name.Contains(searchTerm) ||
                                             p.FullName.Contains(searchTerm));
                }

                if (!string.IsNullOrEmpty(role))
                {
                    query = query.Where(p => p.Role == role);
                }

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error searching players: {ex.Message}");
                return new List<Player>(); 
            }
        }


        private int CalculateAge(DateTime dateOfBirth)
        {
            try
            {
                var today = DateTime.Today;
                var age = today.Year - dateOfBirth.Year;

                if (dateOfBirth.Date > today.AddYears(-age))
                {
                    age--;
                }

                return age;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error calculating age: {ex.Message}");
                return 0; 
            }
        }

    }
    }
