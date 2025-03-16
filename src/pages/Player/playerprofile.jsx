"use client"
import { FaArrowLeft ,FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "../../css/Player/playerprofile.css"

const PlayerProfile = () => {

  const [player, setPlayer] = useState(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [editedPlayer, setEditedPlayer] = useState(null) //to store temporarliy
  const { playerId } = useParams()
  const navigate = useNavigate()

  // Mock data fetch - in a real app, this would be an API call
  useEffect(() => {
    
   

    // This would be fetched from an API in a real application
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
        matchHistory: [
          { opponent: "Australia", date: "2023-03-15", runs: 74, wickets: 0 },
          { opponent: "England", date: "2023-02-28", runs: 120, wickets: 0 },
          { opponent: "South Africa", date: "2023-01-10", runs: 45, wickets: 1 },
        ],
        image: "/placeholder.svg?height=300&width=300",
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
        matchHistory: [
          { opponent: "Australia", date: "2023-03-15", runs: 8, wickets: 3 },
          { opponent: "England", date: "2023-02-28", runs: 0, wickets: 5 },
          { opponent: "South Africa", date: "2023-01-10", runs: 12, wickets: 2 },
        ],
        image: "/placeholder.svg?height=300&width=300",
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
        matchHistory: [
          { opponent: "Australia", date: "2023-03-15", runs: 45, wickets: 2 },
          { opponent: "England", date: "2023-02-28", runs: 62, wickets: 3 },
          { opponent: "South Africa", date: "2023-01-10", runs: 33, wickets: 1 },
        ],
        image: "/placeholder.svg?height=300&width=300",
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
        matchHistory: [
          { opponent: "Australia", date: "2023-03-15", runs: 103, wickets: 0 },
          { opponent: "England", date: "2023-02-28", runs: 83, wickets: 0 },
          { opponent: "South Africa", date: "2023-01-10", runs: 35, wickets: 0 },
        ],
        image: "/placeholder.svg?height=300&width=300",
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
        matchHistory: [
          { opponent: "Australia", date: "2023-03-15", runs: 89, wickets: 0 },
          { opponent: "England", date: "2023-02-28", runs: 41, wickets: 0 },
          { opponent: "South Africa", date: "2023-01-10", runs: 76, wickets: 0 },
        ],
        image: "/placeholder.svg?height=300&width=300",
      },
    ]

    const foundPlayer = mockPlayers.find((p) => p.id === Number.parseInt(playerId))
    setPlayer(foundPlayer)
    setEditedPlayer(foundPlayer ? { ...foundPlayer } : null)
  }, [playerId])

  if (!player) {
    return <div className="loading">Loading player data...</div>
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setPlayer(editedPlayer)
      // In a real would send this to an API
      console.log("Saving player data:", editedPlayer)
    }
    setIsEditing(!isEditing)
  }

  const handleCancelEdit = () => {
    setEditedPlayer({ ...player }); // Reset editedPlayer to the original player data
    setIsEditing(false); // Exit edit mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedPlayer({
      ...editedPlayer,
      [name]: value,
    })
  }

  const handleStatChange = (e) => {
    const { name, value } = e.target
    setEditedPlayer({
      ...editedPlayer,
      statistics: {
        ...editedPlayer.statistics,
        [name]: value,
      },
    })
  }


  const handleDeletePlayer = () => {
    if (window.confirm(`Are you sure you want to delete ${player.name}?`)) {
      // In a real app, you would send a delete request to an API
      console.log("Deleting player:", player.id)
      navigate("/")
    }
  }


  // const handleDeletePlayer = async () => {
  //   if (window.confirm(`Are you sure you want to delete ${player.name}?`)) {
  //     try {
  //       // Simulate deletion by updating local state
  //       setPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== player.id));
  
  //       console.log("Player deleted:", player.id);
  
  //       // Navigate to all players page
  //       navigate("/");
  //     } catch (error) {
  //       console.error("Error deleting player:", error);
  //     }
  //   }
  // };

  // const handleDeletePlayer = async () => {
  //   if (window.confirm(`Are you sure you want to delete ${player.name}?`)) {
  //     try {
  //       // Send DELETE request to API
  //       await fetch(`https://API.com/players/${player.id}`, {
  //         method: "DELETE",
  //       });
  
  //       console.log("Player deleted:", player.id);
  
  //       // Navigate to all players page
  //       navigate("/");
  //     } catch (error) {
  //       console.error("Error deleting player:", error);
  //     }
  //   }
  // };
  

  const calculateAge = (dob) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="player-profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate("/view_all_players")}>
        <FaArrowLeft />Back to Players
        </button>
        <h1>{player.name}'s Profile</h1>

 
        <div className="profile-actions">
          {isEditing ? (
            <>
            <button className="edit-button" onClick={handleEditToggle}>
              Save Changes
            </button>
            <button className="edit-button" onClick={handleCancelEdit}>
              Cancel
            </button>
            </>
          ) : (
            <>
            <button className="edit-button" onClick={handleEditToggle}>
              <FaEdit /> Edit Profile
            </button>
            <button className="delete-button" onClick={handleDeletePlayer}>
              <FaTrash /> Delete Player
            </button>
            </>
          )}
        </div>


        {/* <div className="profile-actions">
          <button className="edit-button" onClick={handleEditToggle}>
            {isEditing ? "Save Changes"  : <><FaEdit /> Edit Profile</>}
          </button>
          {!isEditing && (
            <button className="delete-button" onClick={handleDeletePlayer}>
             <FaTrash /> Delete Player
            </button>
          )}
        </div> */}
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => handleTabChange("profile")}
        >
          Profile
        </button>
        <button
          className={`tab-button ${activeTab === "statistics" ? "active" : ""}`}
          onClick={() => handleTabChange("statistics")}
        >
          Statistics
        </button>
        <button
          className={`tab-button ${activeTab === "matches" ? "active" : ""}`}
          onClick={() => handleTabChange("matches")}
        >
          Match History
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && (
          <div className="profile-details">
            <div className="profile-image-container">
              <img src={player.image || "/placeholder.svg"} alt={player.name} className="profile-image" />
            </div>

            <div className="player-info">
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={editedPlayer.name} onChange={handleInputChange} />
                  </div>

                  <div className="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" name="dob" value={editedPlayer.dob} onChange={handleInputChange} />
                  </div>

                  <div className="form-group">
                    <label>Role:</label>
                    <select name="role" value={editedPlayer.role} onChange={handleInputChange}>
                      <option value="Batsman">Batsman</option>
                      <option value="Bowler">Bowler</option>
                      <option value="All-rounder">All-rounder</option>
                      <option value="Wicket-keeper">Wicket-keeper</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Medical Status:</label>
                    <select name="medicalStatus" value={editedPlayer.medicalStatus} onChange={handleInputChange}>
                      <option value="Well">Well</option>
                      <option value="Injured">Injured</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Batting Style:</label>
                    <select name="battingStyle" value={editedPlayer.battingStyle} onChange={handleInputChange}>
                      <option value="Right-handed">Right-handed</option>
                      <option value="Left-handed">Left-handed</option>
                      <option value="Switch-Hitter">Switch-Hitter</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Bowling Style:</label>
                    <select name="bowlingStyle" value={editedPlayer.bowlingStyle} onChange={handleInputChange}>
                      <option value="Right-Arm Fast">Right-Arm Fast</option>
                      <option value="Left-Arm Fast">Left-Arm Fast</option>
                      <option value="Right-Arm Spin">Right-Arm Spin</option>
                      <option value="Left-Arm Spin">Left-Arm Spin</option>
                      <option value="Off-Spin">Off-Spin</option>
                      <option value="Leg-Spin">Leg-Spin</option>
                      <option value="Left-Arm Orthodox">Left-Arm Orthodox</option>
                      <option value="Left-Arm Unorthodox">Left-Arm Unorthodox(Chinaman)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="info-display">
                  <div className="info-row">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{player.name}</span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Age:</span>
                    <span className="info-value">
                       {calculateAge(player.dob)}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Date of Birth:</span>
                    <span className="info-value">
                      {formatDate(player.dob)} 
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Role:</span>
                    <span className="info-value">{player.role}</span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Medical Status:</span>
                    <span className={`info-value status ${player.medicalStatus.toLowerCase()}`}>
                      {player.medicalStatus}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Batting Style:</span>
                    <span className="info-value">{player.battingStyle}</span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Bowling Style:</span>
                    <span className="info-value">{player.bowlingStyle}</span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Player Rating:</span>
                    <span className="info-value rating">
                           {((player.statistics.runs + player.statistics.wickets) / 50).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "statistics" && (
          <div className="statistics-container">
            <h2>Career Statistics</h2>

            {isEditing ? (
              <div className="edit-stats-form">
                <div className="form-group">
                  <label>Matches:</label>
                  <input
                    type="number"
                    name="matches"
                    value={editedPlayer.statistics.matches}
                    onChange={handleStatChange}
                  />
                </div>

                <div className="form-group">
                  <label>Runs:</label>
                  <input type="number" name="runs" value={editedPlayer.statistics.runs} onChange={handleStatChange} />
                </div>

                <div className="form-group">
                  <label>Average:</label>
                  <input
                    type="number"
                    name="average"
                    value={editedPlayer.statistics.average}
                    onChange={handleStatChange}
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label>Centuries:</label>
                  <input
                    type="number"
                    name="centuries"
                    value={editedPlayer.statistics.centuries}
                    onChange={handleStatChange}
                  />
                </div>

                <div className="form-group">
                  <label>Wickets:</label>
                  <input
                    type="number"
                    name="wickets"
                    value={editedPlayer.statistics.wickets}
                    onChange={handleStatChange}
                  />
                </div>

                <div className="form-group">
                  <label>Economy:</label>
                  <input
                    type="number"
                    name="economy"
                    value={editedPlayer.statistics.economy}
                    onChange={handleStatChange}
                    step="0.01"
                  />
                </div>
              </div>
            ) : (
              <div className="stats-display">
                <div className="stat-card">
                  <div className="stat-value">{player.statistics.matches}</div>
                  <div className="stat-label">Matches</div>
                </div>

                {(player.role === "Batsman" || player.role === "All-rounder" || player.role === "Wicket-keeper") && (
                  <>
                    <div className="stat-card">
                      <div className="stat-value">{player.statistics.runs}</div>
                      <div className="stat-label">Runs</div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-value">{player.statistics.average}</div>
                      <div className="stat-label">Average</div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-value">{player.statistics.centuries}</div>
                      <div className="stat-label">Centuries</div>
                    </div>
                  </>
                )}

                {(player.role === "Bowler" || player.role === "All-rounder") && (
                  <>
                    <div className="stat-card">
                      <div className="stat-value">{player.statistics.wickets}</div>
                      <div className="stat-label">Wickets</div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-value">{player.statistics.economy}</div>
                      <div className="stat-label">Economy</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "matches" && (
          <div className="match-history-container">
            <h2>Recent Match History</h2>

            <table className="match-history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Opponent</th>
                  <th>Runs</th>
                  <th>Wickets</th>
                </tr>
              </thead>
              <tbody>
                {player.matchHistory.map((match, index) => (
                  <tr key={index}>
                    <td>{formatDate(match.date)}</td>
                    <td>{match.opponent}</td>
                    <td>{match.runs}</td>
                    <td>{match.wickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlayerProfile

