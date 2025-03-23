import React, { useState } from "react";
import '../../css/Player/AddPlayer.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft ,FaEdit, FaTrash } from "react-icons/fa";

const AddPlayer = ({ onAddPlayer }) => {
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "",
      fullname: "",
      email: "",
      born: "",
      age: "",
      role: {
        bowlers: false,
        batters: false,
        wicketKeeper: false,
        allRounder: false,
      },
      battingStyle: "",
      bowlingStyle: {
        rightArmFast: false,
        rightArmSpin: false,
        offSpin: false,
        leftArmOrthodox: false,
        leftArmFast: false,
        leftArmSpin: false,
        legSpin: false,
        leftArmUnorthodox: false,
      },
      record: "",
      image: null,
    },
  ])

  const [errors, setErrors] = useState({})
  const navigate = useNavigate(); // Use navigate to go back to the "All Players" page

  const validateField = (playerId, name, value) => {
    let errorMsg = ""

    // Check for empty required fields
    if (name !== "record" && !value) {
      errorMsg = `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1")} is required.`
    } else {
      // Specific field validation
      if (name === "name" || name === "fullname") {
        if (!/^[A-Za-z\s.]+$/.test(value)) {
          errorMsg = "Only letters, spaces and dots allowed."
        }
      }
      if (name === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMsg = "Please enter a valid email address."
        }
      }
      if (name === "age") {
        if (!/^\d+$/.test(value) || value < 10 || value > 50) {
          errorMsg = "Age should be a number between 10 and 50."
        }
      }
      if (name === "battingStyle" && !value) {
        errorMsg = "Please select a batting style."
      }
      if (name === "role") {
        const hasRole = Object.values(value).some((val) => val === true)
        if (!hasRole) {
          errorMsg = "Please select at least one player role."
        }
      }
      if (name === "bowlingStyle") {
        const hasBowlingStyle = Object.values(value).some((val) => val === true)
        if (!hasBowlingStyle) {
          errorMsg = "Please select at least one bowling style."
        }
      }
    }

    setErrors((prev) => ({
      ...prev,
      [`${playerId}-${name}`]: errorMsg,
    }))

    return errorMsg === ""
  }

  const handleInputChange = (playerId, name, value) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => (player.id === playerId ? { ...player, [name]: value } : player)),
    )

    validateField(playerId, name, value)
  }

  const handleRoleChange = (playerId, roleName, checked) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? {
              ...player,
              role: {
                ...player.role,
                [roleName]: checked,
              },
            }
          : player,
      ),
    )

    const updatedPlayer = players.find((p) => p.id === playerId)
    const updatedRole = { ...updatedPlayer.role, [roleName]: checked }
    validateField(playerId, "role", updatedRole)
  }

  const handleBowlingStyleChange = (playerId, styleName, checked) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? {
              ...player,
              bowlingStyle: {
                ...player.bowlingStyle,
                [styleName]: checked,
              },
            }
          : player,
      ),
    )

    const updatedPlayer = players.find((p) => p.id === playerId)
    const updatedBowlingStyle = { ...updatedPlayer.bowlingStyle, [styleName]: checked }
    validateField(playerId, "bowlingStyle", updatedBowlingStyle)
  }

  const handleFileChange = (playerId, file) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => (player.id === playerId ? { ...player, image: file } : player)),
    )

    validateField(playerId, "image", file)
  }

  const addPlayer = () => {
    setPlayers([
      ...players,
      {
        id: players.length + 1,
        name: "",
        fullname: "",
        email: "",
        born: "",
        age: "",
        role: {
          bowlers: true,
          batters: false,
          wicketKeeper: false,
          allRounder: false,
        },
        battingStyle: "",
        bowlingStyle: {
          rightArmFast: false,
          rightArmSpin: false,
          offSpin: false,
          leftArmOrthodox: false,
          leftArmFast: false,
          leftArmSpin: false,
          legSpin: false,
          leftArmUnorthodox: false,
        },
        record: "",
        image: null,
      },
    ])
  }

  const submitForm = async (e) => {
    e.preventDefault()

    let isValid = true
   

    // Validate all fields for all players
    players.forEach((player) => {
      if (!validateField(player.id, "name", player.name)) isValid = false
      if (!validateField(player.id, "fullname", player.fullname)) isValid = false
      if (!validateField(player.id, "email", player.email)) isValid = false
      if (!validateField(player.id, "born", player.born)) isValid = false
      if (!validateField(player.id, "age", player.age)) isValid = false
      if (!validateField(player.id, "battingStyle", player.battingStyle)) isValid = false
      if (!validateField(player.id, "role", player.role)) isValid = false
      if (!validateField(player.id, "bowlingStyle", player.bowlingStyle)) isValid = false
      if (!validateField(player.id, "image", player.image)) isValid = false
    })

    if (!isValid) {
      alert("Please fix the errors before submitting.")
      return
    }

    try {
      // Here you would normally send the data to your API
      // const response = await fetch("http://localhost:5000/api/players", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(players),
      // });

      // if (response.ok) {
      //   alert("Players Registered Successfully! ✅");
      // } else {
      //   alert("Error registering players. ❌");
      // }


       // Call the onAddPlayer prop to add the new players to the "All Players" list
       if (onAddPlayer) {
        onAddPlayer(players)
      }

      // For now, just show success message
      alert("Form Submitted Successfully! ✅")

      // Navigate back to the "All Players" page
      navigate("/view_all_players");

      // Reset form after successful submission
      setPlayers([
        {
          id: 1,
          name: "",
          fullname: "",
          email: "",
          born: "",
          age: "",
          role: {
            bowlers: true,
            batters: false,
            wicketKeeper: false,
            allRounder: false,
          },
          battingStyle: "",
          bowlingStyle: {
            rightArmFast: false,
            rightArmSpin: false,
            offSpin: false,
            leftArmOrthodox: false,
            leftArmFast: false,
            leftArmSpin: false,
            legSpin: false,
            leftArmUnorthodox: false,
          },
          record: "",
          image: null,
        },
      ])
      setErrors({})
    } catch (error) {
      alert("Error submitting form: " + error.message)
    }
  }

  return (
    <div className="add_match_data">
       <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 20px' }}></div>
      <button className="back-button" onClick={() => navigate("/view_all_players")}>
        <FaArrowLeft />Back 
        </button>
      
      <p>Add Player</p>
      <main id="main" className="container">
        <div id="form-container">
          {players.map((player) => (
            <div key={player.id} className="player-form">
              <h1>Player {player.id} Details</h1>
              <form method="GET" action="">
                <label>
                  Name *
                  <input
                    type="text"
                    name={`name${player.id}`}
                    placeholder="Enter name"
                    value={player.name}
                    onChange={(e) => handleInputChange(player.id, "name", e.target.value)}
                    className={errors[`${player.id}-name`] ? "error" : ""}
                    required
                  />
                </label>
                {errors[`${player.id}-name`] && <span className="error-text">{errors[`${player.id}-name`]}</span>}

                <label>
                  Full Name *
                  <input
                    type="text"
                    name={`fullname${player.id}`}
                    placeholder="Enter name with initials"
                    value={player.fullname}
                    onChange={(e) => handleInputChange(player.id, "fullname", e.target.value)}
                    className={errors[`${player.id}-fullname`] ? "error" : ""}
                    required
                  />
                </label>
                {errors[`${player.id}-fullname`] && (
                  <span className="error-text">{errors[`${player.id}-fullname`]}</span>
                )}

                <label>
                  Email *
                  <input
                    type="email"
                    name={`email${player.id}`}
                    placeholder="Enter email"
                    value={player.email}
                    onChange={(e) => handleInputChange(player.id, "email", e.target.value)}
                    className={errors[`${player.id}-email`] ? "error" : ""}
                    required
                  />
                </label>
                {errors[`${player.id}-email`] && <span className="error-text">{errors[`${player.id}-email`]}</span>}

                <label>
                  Born *
                  <input
                    type="date"
                    name={`born${player.id}`}
                    placeholder="Enter Date of Birth"
                    value={player.born}
                    onChange={(e) => handleInputChange(player.id, "born", e.target.value)}
                    className={errors[`${player.id}-born`] ? "error" : ""}
                    required
                  />
                </label>
                {errors[`${player.id}-born`] && <span className="error-text">{errors[`${player.id}-born`]}</span>}

                <label>
                  Age *
                  <input
                    type="number"
                    name={`age${player.id}`}
                    min={10}
                    max={50}
                    placeholder="Enter age"
                    value={player.age}
                    onChange={(e) => handleInputChange(player.id, "age", e.target.value)}
                    className={errors[`${player.id}-age`] ? "error" : ""}
                    required
                  />
                </label>
                {errors[`${player.id}-age`] && <span className="error-text">{errors[`${player.id}-age`]}</span>}

                <label>Player Role *</label>
                <div className="radio-group">
                  <div className="row">
                    <div className="horizontal-checkbox-group">
                      <input
                        type="checkbox"
                        id={`bowlers${player.id}`}
                        name={`bowlers${player.id}`}
                        value="bowlers"
                        checked={player.role.bowlers}
                        onChange={(e) => handleRoleChange(player.id, "bowlers", e.target.checked)}
                      />
                      <label htmlFor={`bowlers${player.id}`}>Bowlers</label>

                      <input
                        type="checkbox"
                        id={`batters${player.id}`}
                        name={`batters${player.id}`}
                        value="Batters"
                        checked={player.role.batters}
                        onChange={(e) => handleRoleChange(player.id, "batters", e.target.checked)}
                      />
                      <label htmlFor={`batters${player.id}`}>Batters</label>

                      <input
                        type="checkbox"
                        id={`wicketKeeper${player.id}`}
                        name={`wicketKeeper${player.id}`}
                        value="Wicket Keeper"
                        checked={player.role.wicketKeeper}
                        onChange={(e) => handleRoleChange(player.id, "wicketKeeper", e.target.checked)}
                      />
                      <label htmlFor={`wicketKeeper${player.id}`}>Wicket Keeper</label>

                      <input
                        type="checkbox"
                        id={`allRounder${player.id}`}
                        name={`allRounder${player.id}`}
                        value="All Rounder"
                        checked={player.role.allRounder}
                        onChange={(e) => handleRoleChange(player.id, "allRounder", e.target.checked)}
                      />
                      <label htmlFor={`allRounder${player.id}`}>All Rounder</label>
                    </div>
                  </div>
                </div>
                {errors[`${player.id}-role`] && <span className="error-text">{errors[`${player.id}-role`]}</span>}

                <label>Batting Style *</label>
                <div className="radio-group">
                  <input
                    type="radio"
                    id={`rightHanded${player.id}`}
                    name={`battingStyle${player.id}`}
                    value="Right Handed Batsman"
                    checked={player.battingStyle === "Right Handed Batsman"}
                    onChange={(e) => handleInputChange(player.id, "battingStyle", e.target.value)}
                  />
                  <label htmlFor={`rightHanded${player.id}`}>Right Handed Batsman</label>

                  <input
                    type="radio"
                    id={`leftHanded${player.id}`}
                    name={`battingStyle${player.id}`}
                    value="Left Handed Batsman"
                    checked={player.battingStyle === "Left Handed Batsman"}
                    onChange={(e) => handleInputChange(player.id, "battingStyle", e.target.value)}
                  />
                  <label htmlFor={`leftHanded${player.id}`}>Left Handed Batsman</label>

                  <input
                    type="radio"
                    id={`switchHitter${player.id}`}
                    name={`battingStyle${player.id}`}
                    value="Switch-Hitter"
                    checked={player.battingStyle === "Switch-Hitter"}
                    onChange={(e) => handleInputChange(player.id, "battingStyle", e.target.value)}
                  />
                  <label htmlFor={`switchHitter${player.id}`}>Switch Hitter</label>
                </div>
                {errors[`${player.id}-battingStyle`] && (
                  <span className="error-text">{errors[`${player.id}-battingStyle`]}</span>
                )}

                <label>Bowling Style *</label>
                <div className="radio-group">
                  <div className="row">
                    <input
                      type="checkbox"
                      id={`rightArmFast${player.id}`}
                      name={`bowlingStyle${player.id}`}
                      value="Right-Arm Fast"
                      checked={player.bowlingStyle.rightArmFast}
                      onChange={(e) => handleBowlingStyleChange(player.id, "rightArmFast", e.target.checked)}
                    />
                    <label htmlFor={`rightArmFast${player.id}`}>Right-Arm Fast</label>

                    <input
                      type="checkbox"
                      id={`rightArmSpin${player.id}`}
                      name={`bowlingStyle${player.id}`}
                      value="Right-Arm Spin"
                      checked={player.bowlingStyle.rightArmSpin}
                      onChange={(e) => handleBowlingStyleChange(player.id, "rightArmSpin", e.target.checked)}
                    />
                    <label htmlFor={`rightArmSpin${player.id}`}>Right-Arm Spin</label>

                    <input
                      type="checkbox"
                      id={`offSpin${player.id}`}
                      name={`bowlingStyle${player.id}`}
                      value="Off-Spin"
                      checked={player.bowlingStyle.offSpin}
                      onChange={(e) => handleBowlingStyleChange(player.id, "offSpin", e.target.checked)}
                    />
                    <label htmlFor={`offSpin${player.id}`}>Off-Spin</label>

                    <input
                      type="checkbox"
                      id={`leftArmOrthodox${player.id}`}
                      name={`bowlingStyle${player.id}`}
                      value="Left-Arm Orthodox"
                      checked={player.bowlingStyle.leftArmOrthodox}
                      onChange={(e) => handleBowlingStyleChange(player.id, "leftArmOrthodox", e.target.checked)}
                    />
                    <label htmlFor={`leftArmOrthodox${player.id}`}>Left-Arm Orthodox  </label>
                  </div>
                    <br /> 
                  <div className="row">
                    <input
                      type="checkbox"
                      id={`leftArmFast${player.id}`}
                      name={`leftArmFast${player.id}`}
                      value="Left-Arm Fast"
                      checked={player.bowlingStyle.leftArmFast}
                      onChange={(e) => handleBowlingStyleChange(player.id, "leftArmFast", e.target.checked)}
                    />
                    <label htmlFor={`leftArmFast${player.id}`}>Left-Arm Fast</label>

                    <input
                      type="checkbox"
                      id={`leftArmSpin${player.id}`}
                      name={`leftArmSpin${player.id}`}
                      value="Left-Arm Spin"
                      checked={player.bowlingStyle.leftArmSpin}
                      onChange={(e) => handleBowlingStyleChange(player.id, "leftArmSpin", e.target.checked)}
                    />
                    <label htmlFor={`leftArmSpin${player.id}`}>Left-Arm Spin</label>

                    <input
                      type="checkbox"
                      id={`legSpin${player.id}`}
                      name={`legSpin${player.id}`}
                      value="Leg-Spin"
                      checked={player.bowlingStyle.legSpin}
                      onChange={(e) => handleBowlingStyleChange(player.id, "legSpin", e.target.checked)}
                    />
                    <label htmlFor={`legSpin${player.id}`}>Leg-Spin</label>

                    <input
                      type="checkbox"
                      id={`leftArmUnorthodox${player.id}`}
                      name={`leftArmUnorthodox${player.id}`}
                      value="Left-Arm Unorthodox (Chinaman)"
                      checked={player.bowlingStyle.leftArmUnorthodox}
                      onChange={(e) => handleBowlingStyleChange(player.id, "leftArmUnorthodox", e.target.checked)}
                    />
                    <label htmlFor={`leftArmUnorthodox${player.id}`}>Left-Arm Unorthodox(Chinaman)</label>
                  </div>
                </div>
                {errors[`${player.id}-bowlingStyle`] && (
                  <span className="error-text">{errors[`${player.id}-bowlingStyle`]}</span>
                )}

                <label>
                  Any Record..
                  <textarea
                    name={`record${player.id}`}
                    maxLength={194}
                    value={player.record}
                    onChange={(e) => handleInputChange(player.id, "record", e.target.value)}
                  />
                </label>

                <label>Upload image*</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id={`imageUpload${player.id}`}
                    name="playerImage"
                    accept="image/*"
                    onChange={(e) => handleFileChange(player.id, e.target.files[0])}
                    className={`file-input ${errors[`${player.id}-image`] ? "error" : ""}`}
                  />
                  <label htmlFor={`imageUpload${player.id}`} className="upload-button">
                    Upload
                  </label>
                  <span className="file-name">{player.image ? player.image.name : "No file chosen"}</span>
                </div>
                {errors[`${player.id}-image`] && <span className="error-text">{errors[`${player.id}-image`]}</span>}
              </form>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={addPlayer} className="btn">
            Add another player details
          </button>
          <button onClick={submitForm} className="btn">
            Submit the form
          </button>
        </div>
      </main>
    </div>
  )
}

export default AddPlayer