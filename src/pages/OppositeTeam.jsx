import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMatchData = () => {
  const [selected, setSelected] = useState("");
  const [players, setPlayers] = useState([{ id: 1 }]);
  const [playerRoles, setPlayerRoles] = useState({ 1: "Bowlers" });
  const [loading, setLoading] = useState(false);
  const [outStatus, setOutStatus] = useState({});
  const [outType, setOutType] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [oversData, setOversData] = useState([{ overs: "", runsGiven: "", whiteBall: "" }]);
  const navigate = useNavigate();


  
  const addPlayer = () => {
    const newId = players.length + 1;
    setPlayers([...players, { id: newId }]);
    setPlayerRoles({ ...playerRoles, [newId]: "Bowlers" });
  };

  
  const addOver = () => {
    setOversData([...oversData, { overs: "", runsGiven: "", whiteBall: "" }]);
  };

  const handleOverChange = (index, event) => {
    const newOversData = [...oversData];
    newOversData[index][event.target.name] = event.target.value;
    setOversData(newOversData);
  };

  const deletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
    const newPlayerRoles = { ...playerRoles };
    delete newPlayerRoles[id];
    setPlayerRoles(newPlayerRoles);
  };

  const validateForm = () => {
    let errors = {};
    players.forEach((player) => {
      const playerFields = [
        `name${player.id}`,
        `email${player.id}`,
        `runs${player.id}`,
        `wickets${player.id}`,
        `balls${player.id}`,
        `fours${player.id}`,
        `sixes${player.id}`,
        `ballsFaced${player.id}`,
      ];

      playerFields.forEach((field) => {
        if (!document.getElementsByName(field)[0].value) {
          errors[field] = `${field} is required`;
        }
      });

      if (!playerRoles[player.id]) {
        errors[`role${player.id}`] = "Role is required";
      }
    });
    return errors;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = validateForm();

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    const matchDetails = {
      matchName: e.target.matchName.value,
      teams: e.target.teams.value,
      oppositeTeams: e.target.oppositeTeams.value,
      targetRun: e.target.targetRun.value,
      ourRun: e.target.ourRun.value,
      matchDate: e.target.matchDate.value,
      matchPlace: e.target.matchPlace.value,
      matchResult: e.target.matchResult.value, // Added matchResult here
    };

    const playerDetails = players.map((player) => ({
      name: e.target[`name${player.id}`].value,
      email: e.target[`email${player.id}`].value,
      role: playerRoles[player.id],
      runs: e.target[`runs${player.id}`].value,
      wickets: e.target[`wickets${player.id}`].value,
      balls: e.target[`balls${player.id}`].value,
      fours: e.target[`fours${player.id}`].value,
      sixes: e.target[`sixes${player.id}`].value,
      ballsFaced: e.target[`ballsFaced${player.id}`].value,
      suggestions: e.target[`suggestions${player.id}`].value,
      outStatus: outStatus[player.id],
      outType: outType[player.id],
      runOutReason: e.target[`runOutReason${player.id}`]?.value,
      fielder: e.target[`fielder${player.id}`]?.value,
    }));

    const fullData = {
      match: matchDetails,
      players: playerDetails,
      oversData: oversData,
    };

    try {
      await axios.post("http://localhost:5002/api/match/matchdata", fullData);
      alert("Form Submitted Successfully!");
    } catch (error) {
      alert("Error submitting form");
      console.error(error);
    } finally {
      setLoading(false);
    }

    const deletePlayer = (playerId) => {
        setPlayers(players.filter(player => player.id !== playerId));
        const newOutStatus = { ...outStatus };
        delete newOutStatus[playerId];
        setOutStatus(newOutStatus);
    
        const newOutType = { ...outType };
        delete newOutType[playerId];
        setOutType(newOutType);
    
        const newPlayerRoles = { ...playerRoles };
        delete newPlayerRoles[playerId];
        setPlayerRoles(newPlayerRoles);
      };
    
      const resetPlayer = (playerId) => {
        document.querySelectorAll(`[name^='name${playerId}']`).forEach(input => input.value = "");
        document.querySelectorAll(`[name^='email${playerId}']`).forEach(input => input.value = "");
        document.querySelectorAll(`[name^='runs${playerId}']`).forEach(input => input.value = "");
        // Reset other fields similarly
        setOutStatus({ ...outStatus, [playerId]: "" });
        setOutType({ ...outType, [playerId]: "" });
        setPlayerRoles({ ...playerRoles, [playerId]: "Bowlers" });
      };
  };

  return (
    <div className="add_match_data">
      <div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <p>Add Match Data</p>


      <h1><legend style={{ textAlign: "center" }}>Select Team</legend></h1>
      <div className="team-selection">
      <div className="team-container">
        
      <a href="/OurTeam">

        <button
          type="button"
          className={`team-option ${selected === "our" ? "selected" : ""}`}
          onClick={() => setSelected("our")}
        >
          Our Team
        </button>
        </a>
        <a href="/OppositeTeam">

        <button
          type="button"
          className={`team-option ${selected === "opposite" ? "selected" : ""}`}
          onClick={() => setSelected("opposite")}
        >
          Opposite Team
        </button>
        </a>
      </div>
    </div>

      <main id="main" className="container">
        <div id="form-container">
          <div id="match-details" className="player-form">
            <h1>Add Opposite Team Data</h1>
            <form id="matchForm" onSubmit={submitForm}>
              <label>Match Name *
                <input type="text" name="matchName" required />
              </label>
              <label>Match code *
                <input type="text" name="matchcode" required />
              </label>
              

              <h1><legend style={{ textAlign: "center" }}>Inics</legend></h1>
<fieldset className="radio-group">
  <input type="radio" id="firstInics" name="InicsT" value="First Inics" required />
  <label htmlFor="firstInics">First Inics</label>
  <input type="radio" id="secondInics" name="InicsT" value="Second Inics" />
  <label htmlFor="secondInics">Second Inics</label>
</fieldset>

<h1><legend style={{ textAlign: "center" }}>Toss Result</legend></h1>
<fieldset className="radio-group">
  <input type="radio" id="win" name="Toss Result" value="win" required />
  <label htmlFor="win">Win</label>
  <input type="radio" id="loss" name="Toss Result" value="loss" />
  <label htmlFor="loss">Loss</label>
</fieldset>

<h1><legend style={{ textAlign: "center" }}>First Choice</legend></h1>
<fieldset className="radio-group">
  <input type="radio" id="batting" name="First Choice" value="Batting" required />
  <label htmlFor="batting">Batting</label>
  <input type="radio" id="bowling" name="First Choice" value="Bowling" />
  <label htmlFor="bowling">Bowling</label>
</fieldset>



              <label>Participating Teams *
                <input type="text" name="teams" required />
              </label>
              <label>Participating Opposite Teams *
                <input type="text" name="oppositeTeams" placeholder="Opposite Teams" required />
              </label>
              <label>Our Teams Run *
                <input type="number" name="ourRun" placeholder="Total Run" required />
              </label>
              <label>Date *
                <input type="date" name="matchDate" required />
              </label>
              <label>Place *
                <input type="text" name="matchPlace" required />
              </label>
              <h1><legend style={{ textAlign: "center" }}>Match Result</legend></h1>
<fieldset className="radio-group">
  <input type="radio" id="winthematch" name="matchResult" value="winthematch" required />
  <label htmlFor="winthematch">Win</label>
  <input type="radio" id="lossthematch" name="matchResult" value="lossthematch" />
  <label htmlFor="lossthematch">Loss</label>
</fieldset>


              {players.map((player) => (
                <div key={player.id}>
                  <h1>Player {player.id} Details</h1>

                  <label>Name *
                    <input type="text" name={`name${player.id}`} required />
                  </label>

                  <label>Email *
                    <input type="email" name={`email${player.id}`} required />
                  </label>

                  <h1><legend style={{ textAlign: "center" }}>Position of Batting</legend></h1>
<fieldset className="radio-group">
  <input type="radio" id="Batting1" name="First Choice" value="Batting" required />
  <label htmlFor="Batting1">1st</label>
  <input type="radio" id="Bowling1" name="First Choice" value="Bowling" />
  <label htmlFor="Bowling1">2nd</label>
  
  <input type="radio" id="Batting2" name="First Choice" value="Batting" required />
  <label htmlFor="Batting2">3rd</label>
  <input type="radio" id="Bowling2" name="First Choice" value="Bowling" />
  <label htmlFor="Bowling2">4th</label>
  
  <input type="radio" id="Batting3" name="First Choice" value="Batting" required />
  <label htmlFor="Batting3">5th</label>
  <input type="radio" id="Bowling3" name="First Choice" value="Bowling" />
  <label htmlFor="Bowling3">6th</label>
</fieldset>

<fieldset className="radio-group">
  <input type="radio" id="Batting4" name="First Choice" value="Batting" required />
  <label htmlFor="Batting4">7th</label>
  <input type="radio" id="Bowling4" name="First Choice" value="Bowling" />
  <label htmlFor="Bowling4">8th</label>
  
  <input type="radio" id="Batting5" name="First Choice" value="Batting" required />
  <label htmlFor="Batting5">9th</label>
  <input type="radio" id="Bowling5" name="First Choice" value="Bowling" />
  <label htmlFor="Bowling5">10th</label>
  
  <input type="radio" id="Batting6" name="First Choice" value="Batting" required />
  <label htmlFor="Batting6">11th</label>
</fieldset>


                  <div>
                    <br />
                    <h1><legend style={{ textAlign: "center" }}>Out or Not Out</legend></h1>
                    <div className="radio-group">
                      <input
                        type="radio"
                        id={`notOut${player.id}`}
                        name={`outStatus${player.id}`}
                        value="notOut"
                        checked={outStatus[player.id] === "notOut"}
                        onChange={() => setOutStatus({ ...outStatus, [player.id]: "notOut" })}
                        required
                      />
                      <label htmlFor={`notOut${player.id}`}>Not Out</label>

                      <input
                        type="radio"
                        id={`out${player.id}`}
                        name={`outStatus${player.id}`}
                        value="out"
                        checked={outStatus[player.id] === "out"}
                        onChange={() => setOutStatus({ ...outStatus, [player.id]: "out" })}
                      />
                      <label htmlFor={`out${player.id}`}>Out</label>
                    </div>
                  </div>

                  {outStatus[player.id] === "out" && (
                    <div className="out-options">
                      <legend style={{ textAlign: "center" }}>If Out, How?</legend>
                      <div className="radio-group">
                        {["catchOut", "runOut", "stumpOut", "bowledOut", "lbw", "others"].map((type) => (
                          <React.Fragment key={type}>
                            <input
                              type="radio"
                              id={`${type}${player.id}`}
                              name={`outType${player.id}`}
                              value={type}
                              checked={outType[player.id] === type}
                              onChange={() => setOutType({ ...outType, [player.id]: type })}
                            />
                            <label htmlFor={`${type}${player.id}`}>
                              {type === "catchOut"
                                ? "Caught Out"
                                : type === "runOut"
                                ? "Run Out"
                                : type === "stumpOut"
                                ? "Stump Out"
                                : type === "bowledOut"
                                ? "Bowled Out"
                                : type === "lbw"
                                ? "LBW"
                                : "Others"}
                            </label>
                          </React.Fragment>
                        ))}
                      </div>

                      {outType[player.id] && (
                        <div className="run-out-text">
                          <input type="text" name={`runOutReason${player.id}`} placeholder="Enter reason for Out" />
                          <input type="text" name={`fielder${player.id}`} placeholder="Who is the bowler?" />
                          <input type="text" name={`fielder${player.id}`} placeholder="no of over :ex-4.2 (4 th over 2 nd" />

                        </div>
                      )}
                    </div>
                  )}

                  <label style={{ textAlign: 'center' }}>Player Role</label>
                  <div className="radio-group">
                    {['Bowlers', 'Batters', 'Wicket Keeper', 'All Rounder'].map(role => (
                      <React.Fragment key={role}>
                        <input
                          type="radio"
                          id={`${role.replace(/\s/g, '')}${player.id}`}
                          name={`role${player.id}`}
                          value={role}
                          checked={playerRoles[player.id] === role}
                          onChange={() => setPlayerRoles({ ...playerRoles, [player.id]: role })}
                        />
                        <label htmlFor={`${role.replace(/\s/g, '')}${player.id}`}>{role}</label>
                      </React.Fragment>
                    ))}
                  </div>

                  <label>Over *</label>
              
                  <div className="form-container" id="formContainer">
                {oversData.map((over, index) => (
                  <div className="row" key={index}>
                    <div className="column">
                      <input
                        type="text"
                        name="overs"
                        placeholder="No of overs"
                        value={over.overs}
                        onChange={(e) => handleOverChange(index, e)}
                      />
                    </div>
                    <div className="column">
                      <input
                        type="text"
                        name="runsGiven"
                        placeholder="Runs given"
                        value={over.runsGiven}
                        onChange={(e) => handleOverChange(index, e)}
                      />
                    </div>
                    <div className="column">
                      <input
                        type="text"
                        name="whiteBall"
                        placeholder="White Ball?"
                        value={over.whiteBall}
                        onChange={(e) => handleOverChange(index, e)}
                      />
                    </div>
                  </div>
                ))}
                <button type="button" className="add-button" onClick={addOver}>
                  +
                </button>
              </div>

                  <label>Total Runs *
                    <input type="number" name={`runs${player.id}`} required />
                  </label>

                  <label>Total Wickets *
                    <input type="number" name={`wickets${player.id}`} required />
                  </label>

                  <label>Balls *
                    <input type="number" name={`balls${player.id}`} required />
                  </label>

                  <label>Total Fours *
                    <input type="number" name={`fours${player.id}`} required />
                  </label>

                  <label>Total Sixes *
                    <input type="number" name={`sixes${player.id}`} required />
                  </label>

                  <label>Balls Faced *
                    <input type="number" name={`ballsFaced${player.id}`} required />
                  </label>


                  <label>Any Record..
                    <textarea name={`suggestions${player.id}`} maxLength={194} />
                  </label>
                  <div className="button-container">

                  <button type="button" onClick={() => deletePlayer(player.id)} className="btn">
                        Delete Player {player.id}
                    </button>
                  </div>
                </div>
              ))}

              <div className="button-container">
                <button type="button" onClick={addPlayer} className="btn">
                  Add another player
                </button>
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Submitting..." : "Submit the form"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddMatchData;
