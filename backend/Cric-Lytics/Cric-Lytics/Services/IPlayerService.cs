using Cric_Lytics.DTOs;
using Cric_Lytics.Models;

namespace Cric_Lytics.Services
{
    public interface IPlayerService
    {
        Task<IEnumerable<Player>> GetAllPlayersAsync();
        Task<Player> GetPlayerByIdAsync(int id);
        Task<Player> CreatePlayerAsync(PlayerDto playerDto);
        Task<Player> UpdatePlayerAsync(int id, PlayerDto playerDto);
        Task<bool> DeletePlayerAsync(int id);
        Task<IEnumerable<Player>> SearchPlayersAsync(string searchTerm, string role);
    }
}
