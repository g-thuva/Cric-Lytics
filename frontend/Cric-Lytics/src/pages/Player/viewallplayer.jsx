"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import "../../css/Player/viweallplayer.css"
import StarRating from "./StarRating"
import { playerService } from "../../services/api"

const ViewAllPlayers = (allPlayers) => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" })
  const navigate = useNavigate()

  useEffect(() => {
      const fetchPlayers = async () => {
        try {
          setLoading(true)
          const response = await playerService.getAllPlayers()
         
            if (!response.data || response.data.length === 0) {
              setPlayers([]);
              setError("No players found. Please add some players.");
              return;
            }
            // Transform API data to match your frontend structure
            const transformedPlayers = response.data.map(player => ({
              id: player.id,
              name: player.name,
              role: player.role,
              medicalStatus: player.medicalStatus,
              battingStyle: player.battingStyle,
              bowlingStyle: player.bowlingStyle,
              dob: player.dateOfBirth,
          
              rating: player.statistics ? 
              ((player.statistics.runs + player.statistics.wickets) / 50) : 0,
              statistics: player.statistics || {
                matches: 0,
                runs: 0,
                average: 0,
                centuries: 0,
                wickets: 0,
                economy: 0
              },
              image: player.imageUrl || "/placeholder.svg?height=150&width=150"
            }))
               
            setPlayers(transformedPlayers)
            setError("")
          } 
          catch (err) {
            console.error("Error fetching players:", err)
            setError("Failed to load players. Please try again later.")
          }
          finally {
            setLoading(false)
          }
      }
      fetchPlayers()
  }, [])
  
  const handleSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const sortedPlayers = [...players].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  const filteredPlayers = sortedPlayers.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())  //search box
    const matchesRole = roleFilter === "" || player.role.toLowerCase() === roleFilter.toLowerCase()  //filter role
    return matchesSearch && matchesRole
  })

  const handleViewProfile = (playerId) => {
    navigate(`/Player/${playerId}`)
  }

  const handleAddPlayer = () => {
    navigate("/add_player")
  }

  if (loading) {
    return <div className="loading-container">Loading players...</div>
  }

  return (
    <div className="view-all-players-container">
      <h1>Cricket Players</h1>
      <button className="add-player-button" onClick={handleAddPlayer}>
          Add Player
        </button>
        
      {error && <div className="error-message">{error}</div>}
      
      <div className="controls-container">  
      <div className="controls-group">
        <div className="search-container">
        <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
         
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="role-filter">
            <option value="">All Roles</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-rounder">All-rounder</option>
            <option value="Wicket-keeper">Wicket-keeper</option>
          </select>
        </div>

        <div className="sort-container">
          <span>Sort by:</span>
          <button
            className={`sort-button ${sortConfig.key === "name" ? "active" : ""}`}
            onClick={() => handleSort("name")}
          >
            Name {sortConfig.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </button>
          <button
            className={`sort-button ${sortConfig.key === "rating" ? "active" : ""}`}
            onClick={() => handleSort("rating")}
          >
            Rating {sortConfig.key === "rating" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </button>
        </div>

        </div> 
      </div>

      <div className="table-container">
        <table className="players-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Medical Status</th>
              <th>Rating</th>
              <th>Statistics</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.id} className={player.medicalStatus === "Injured" ? "injured" : ""}>
                <td>{player.name}</td>
                <td>{player.role}</td>
                <td className={`status ${player.medicalStatus.toLowerCase()}`}>{player.medicalStatus}</td>
                <td>
                  <StarRating  
                    runs={player.statistics.runs}
                    wickets={player.statistics.wickets} />
                </td>
                <td>
                  <div className="stats-preview">
                    {player.role === "Batsman" || player.role === "All-rounder" || player.role === "Wicket-keeper" ? (
                      <span>Runs: {player.statistics.runs}</span>
                    ) : null}
                    {player.role === "Bowler" || player.role === "All-rounder" ? (
                      <span>Wickets: {player.statistics.wickets}</span>
                    ) : null}
                  </div>
                </td>
                <td>
                  <button className="view-profile-button" onClick={() => handleViewProfile(player.id)}>
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewAllPlayers;

