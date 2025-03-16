"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import "../../css/Player/viweallplayer.css"
import StarRating from "./StarRating"

const ViewAllPlayers = (allPlayers) => {// Accept allPlayers
  const [players, setPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" })
  const navigate = useNavigate()

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockPlayers = [
      {
        id: 1,
        name: "Virat Kohli",
        role: "Batsman",
        medicalStatus: "Well",
        battingStyle: "Right-handed",
        bowlingStyle: "Right-arm medium",
        dob: "1988-11-05",
        rating: 95,
        statistics: {
          matches: 254,
          runs: 12169,
          average: 59.07,
          centuries: 43,
          wickets: 4,
          economy: 5.68,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 2,
        name: "Jasprit Bumrah",
        role: "Bowler",
        medicalStatus: "Well",
        battingStyle: "Right-handed",
        bowlingStyle: "Right-arm fast",
        dob: "1993-12-06",
        rating: 90,
        statistics: {
          matches: 72,
          runs: 180,
          average: 7.5,
          centuries: 0,
          wickets: 128,
          economy: 4.62,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 3,
        name: "Ravindra Jadeja",
        role: "All-rounder",
        medicalStatus: "Injured",
        battingStyle: "Left-handed",
        bowlingStyle: "Left-arm orthodox",
        dob: "1988-12-06",
        rating: 88,
        statistics: {
          matches: 171,
          runs: 2756,
          average: 37.24,
          centuries: 1,
          wickets: 189,
          economy: 4.92,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 4,
        name: "Rohit Sharma",
        role: "Batsman",
        medicalStatus: "Well",
        battingStyle: "Right-handed",
        bowlingStyle: "Right-arm off break",
        dob: "1987-04-30",
        rating: 92,
        statistics: {
          matches: 227,
          runs: 9283,
          average: 48.6,
          centuries: 29,
          wickets: 8,
          economy: 5.32,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 5,
        name: "Rishabh Pant",
        role: "Wicket-keeper",
        medicalStatus: "Injured",
        battingStyle: "Left-handed",
        bowlingStyle: "N/A",
        dob: "1997-10-04",
        rating: 85,
        statistics: {
          matches: 54,
          runs: 2271,
          average: 43.67,
          centuries: 5,
          wickets: 0,
          economy: 0,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 6,
        name: "ishabh Pant",
        role: "Wicket-keeper",
        medicalStatus: "Injured",
        battingStyle: "Left-handed",
        bowlingStyle: "N/A",
        dob: "1997-10-04",
        rating: 85,
        statistics: {
          matches: 54,
          runs: 2271,
          average: 43.67,
          centuries: 5,
          wickets: 0,
          economy: 0,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 7,
        name: "Pant Abh",
        role: "Wicket-keeper",
        medicalStatus: "well",
        battingStyle: "Left-handed",
        bowlingStyle: "N/A",
        dob: "1997-10-04",
        rating: 85,
        statistics: {
          matches: 54,
          runs: 2271,
          average: 43.67,
          centuries: 5,
          wickets: 0,
          economy: 0,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
    ]
    setPlayers(mockPlayers)
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

  return (
    <div className="view-all-players-container">
      <h1>Cricket Players</h1>
      <button className="add-player-button" onClick={handleAddPlayer}>
          Add Player
        </button>
      
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

