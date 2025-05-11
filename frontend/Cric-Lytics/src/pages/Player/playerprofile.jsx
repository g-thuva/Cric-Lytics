"use client"
import { FaArrowLeft ,FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "../../css/Player/playerprofile.css"
import { playerService, matchHistoryService, statisticsService } from "../../services/api"
import defaultProfileImage from "../../pages/images/proxy-image.jpeg";

function formatDateForBackend(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}


const PlayerProfile = () => {
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [editedPlayer, setEditedPlayer] = useState(null) //to store temporarliy
  const { playerId } = useParams()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlayer({
      ...editedPlayer,
      [name]: value,
    });
  };
  

useEffect(() => {
  const fetchPlayerData = async () => {
    try {
      setLoading(true)

      // Get player details
      const playerResponse = await playerService.getPlayerById(playerId)
    
      // Transform API data to match frontend structure
      const playerData = {
        id: playerResponse.data.id,
        name: playerResponse.data.name,
        fullName: playerResponse.data.fullName,
        email: playerResponse.data.email,
        role: playerResponse.data.role,
        medicalStatus: playerResponse.data.medicalStatus,
        battingStyle: playerResponse.data.battingStyle,
        bowlingStyle: playerResponse.data.bowlingStyle,
        dob: playerResponse.data.dateOfBirth.split('T')[0],
        age: playerResponse.data.age,

        image:
          playerResponse.data.imageUrl && 
          playerResponse.data.imageUrl !== "string" &&
          playerResponse.data.imageUrl !== "/images/default-player.png"
            ? (playerResponse.data.imageUrl.startsWith('http') 
              ? playerResponse.data.imageUrl 
              : `http://localhost:5041${playerResponse.data.imageUrl}`)
            : defaultProfileImage,

        statistics: playerResponse.data.statistics || {
          matches: 0,
          runs: 0,
          average: 0,
          centuries: 0,
          wickets: 0,
          economy: 0
        },
        matchHistory: playerResponse.data.matchHistory || []
      }
      
      setPlayer(playerData)
      setEditedPlayer({...playerData})
      setError("")
    } 
    catch (err) {
      console.error("Error fetching player:", err)
      setError("Failed to load player data. Please try again later.")
    }
    finally {
      setLoading(false)
    }
  }
 
  if (playerId) {
    fetchPlayerData()
  }
  }, [playerId])

  if (!player) {
    return <div className="loading">Loading player data...</div>
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleEditToggle = async  () => {
    if (isEditing) {
      console.log("Saving player data:", editedPlayer)

      try {
        const existingPlayer = await playerService.getPlayerById(editedPlayer.id);
        console.log("Existing player response:", existingPlayer);
        
        if (!existingPlayer.data) {
          throw new Error("Player not found");
        }
        //player data for API
        const updateData = {
          name: editedPlayer.name,
          dob: editedPlayer.dob,
          role: editedPlayer.role,
          medicalStatus: editedPlayer.medicalStatus,
          battingStyle: editedPlayer.battingStyle,
          bowlingStyle: editedPlayer.bowlingStyle,
          image: editedPlayer.image instanceof File ? editedPlayer.image : null
        };
        // Update player request
        const response = await playerService.updatePlayer(editedPlayer.id, updateData);
        console.log("Update response:", response);

        setPlayer(prev => {
          // Construct the proper image URL
          const imageUrl = response.data.imageUrl && response.data.imageUrl !== "string" 
            ? (response.data.imageUrl.startsWith('http') 
              ? response.data.imageUrl 
              : `http://localhost:5041${response.data.imageUrl}`)
            : prev.image;
          
          console.log("Setting image URL to:", imageUrl);
        
          return {
            ...prev,
            name: response.data.name,
            fullName: response.data.fullName,
            email: response.data.email,
            role: response.data.role,
            medicalStatus: response.data.medicalStatus,
            battingStyle: response.data.battingStyle,
            bowlingStyle: response.data.bowlingStyle,
            dob: response.data.dateOfBirth.split('T')[0],
            age: response.data.age,
            image: imageUrl || defaultProfileImage,
            statistics: response.data.statistics || prev.statistics,
            matchHistory: response.data.matchHistory || prev.matchHistory
          };
        });
      
      alert("Player updated successfully!");
      setIsEditing(false);
    } 
      catch (err) {
        console.error("Error updating player:", err)
        alert("Failed to update player: " + (err.response?.data || err.message))
      }
    }
    setIsEditing(!isEditing);
  }

  const handleCancelEdit = () => {
    setEditedPlayer({ ...player }); // reset data
    setIsEditing(false); 
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) { //checks if the user selected a file
      setEditedPlayer({
        ...editedPlayer,
        image: e.target.files[0],
        imagePreview: URL.createObjectURL(e.target.files[0])
      });
    }
  };

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

  const handleDeletePlayer = async  () => {
    if (window.confirm(`Are you sure you want to delete ${player.name}?`)) {
      try {
        await playerService.deletePlayer(player.id)
        alert("Player deleted successfully!")
        navigate("/view_all_players")
      } catch (err) {
        console.error("Error deleting player:", err)
        alert("Failed to delete player: " + (err.response?.data || err.message))
      }
    }
  }

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

  if (loading) {
    return <div className="loading">Loading player data...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  if (!player) {
    return <div className="not-found">Player not found</div>
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
            <div className="fixed-size-image-wrapper">
              {isEditing && editedPlayer.imagePreview ? (
                <img 
                  src={editedPlayer.imagePreview || defaultProfileImage}
                  alt="Preview"
                  className="fixed-size-image"
                  onError={(e) => {
                    e.target.src = defaultProfileImage;
                  }}
                />
              ) : (
                 <img
                  src={player.image || defaultProfileImage}
                  alt={`${player.name}'s profile`}
                  className="fixed-size-image"
                  onError={(e) => {
                    e.target.src = defaultProfileImage;
                  }}
                 />
              )}
            </div>
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

                  <div className="form-group">
                    <label>Profile Image:</label>
                    <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
                    {editedPlayer.imagePreview && (
                      <img
                        src={editedPlayer.imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
                      />
                    )}
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