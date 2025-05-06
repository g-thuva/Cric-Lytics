import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const OurPlayers = () => {
  const [selected, setSelected] = useState("");

  const { matchCode } = useParams();
  const [players, setPlayers] = useState([{ id: 1 }]);
  const [playerRoles, setPlayerRoles] = useState({ 1: "Bowlers" });
  const [loading, setLoading] = useState(false);
  const [outStatus, setOutStatus] = useState({});
  const [outType, setOutType] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [oversData, setOversData] = useState([
    { overs: "", runsGiven: "", whiteBall: "" },
  ]);

  const navigate = useNavigate();

  const addPlayer = () => {
    const newId = players.length + 1;
    setPlayers([...players, { id: newId }]);
    setPlayerRoles({ ...playerRoles, [newId]: "Bowlers" });
  };
  const deletePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
    const newPlayerRoles = { ...playerRoles };
    delete newPlayerRoles[id];
    setPlayerRoles(newPlayerRoles);
  };

  const addOver = () => {
    setOversData([...oversData, { overs: "", runsGiven: "", whiteBall: "" }]);
  };

  const handleOverChange = (index, event) => {
    const newOversData = [...oversData];
    newOversData[index][event.target.name] = event.target.value;
    setOversData(newOversData);
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

    const playerDetails = players.map((player) => ({
      matchId: matchCode,
      name: e.target[`name${player.id}`].value,
      playerId: e.target[`playerid${player.id}`].value,
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
      players: playerDetails,
      oversData: oversData,
    };

    try {
      await axios.post(
        "http://localhost:5121/api/Performance/player",
        fullData
      );
      alert("Form Submitted Successfully!");
    } catch (error) {
      alert("Error submitting form");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    //intro part of form//
    <div className="add_match_data">
      <p>Add Players Performance Data</p>

      <h1>
        <legend style={{ textAlign: "center" }}>Select Team</legend>
      </h1>
      <div className="team-selection">
        <div className="team-container">
          <a href="/our-players/:matchCode">
            <button
              type="button"
              className={`team-option ${selected === "our" ? "selected" : ""}`}
              onClick={() => setSelected("our")}
            >
              Our Team
            </button>
          </a>
          <a href="/OppositeTeam/:matchCode">
            <button
              type="button"
              className={`team-option ${
                selected === "opposite" ? "selected" : ""
              }`}
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
            <h1>Add Our Team Data</h1>

            <form id="matchForm" onSubmit={submitForm}>
              <label>
                Match code*
                <input type="text" name="matchCode" required />
              </label>

              {players.map((player) => (
                <div key={player.id}>
                  <h1>Player {player.id} Details</h1>
                  <label>
                    PlayerName *
                    <input type="text" name={`name${player.id}`} required />
                  </label>
                  <label>
                    PlayerId*
                    <input
                      type="playerId"
                      name={`playerId${player.id}`}
                      required
                    />
                  </label>
                  <h1>
                    <legend style={{ textAlign: "center" }}>
                      Position of Batting
                    </legend>

                    <fieldset className="radio-group">
                      <input
                        type="radio"
                        id="pos1"
                        name="position001"
                        value="1"
                        required
                      />
                      <label htmlFor="pos1">1</label>

                      <input
                        type="radio"
                        id="pos2"
                        name="position001"
                        value="2"
                      />
                      <label htmlFor="pos2">2</label>

                      <input
                        type="radio"
                        id="pos3"
                        name="position001"
                        value="3"
                      />
                      <label htmlFor="pos3">3</label>

                      <input
                        type="radio"
                        id="pos4"
                        name="position001"
                        value="4"
                      />
                      <label htmlFor="pos4">4</label>

                      <input
                        type="radio"
                        id="pos5"
                        name="position001"
                        value="5"
                      />
                      <label htmlFor="pos5">5</label>

                      <input
                        type="radio"
                        id="pos6"
                        name="position001"
                        value="6"
                      />
                      <label htmlFor="pos6">6</label>

                      <input
                        type="radio"
                        id="pos7"
                        name="position001"
                        value="7"
                      />
                      <label htmlFor="pos7">7</label>

                      <input
                        type="radio"
                        id="pos8"
                        name="position001"
                        value="8"
                      />
                      <label htmlFor="pos8">8</label>

                      <input
                        type="radio"
                        id="pos9"
                        name="position001"
                        value="9"
                      />
                      <label htmlFor="pos9">9</label>

                      <input
                        type="radio"
                        id="pos10"
                        name="position001"
                        value="10"
                      />
                      <label htmlFor="pos10">10</label>

                      <input
                        type="radio"
                        id="pos11"
                        name="position001"
                        value="11"
                      />
                      <label htmlFor="pos11">11</label>
                    </fieldset>
                  </h1>{" "}
                  <div>
                    <br />
                    <h1>
                      <legend style={{ textAlign: "center" }}>
                        Out or Not Out
                      </legend>
                    </h1>
                    <div className="radio-group">
                      <input
                        type="radio"
                        id={`notOut${player.id}`}
                        name={`outStatus${player.id}`}
                        value="notOut"
                        checked={outStatus[player.id] === "notOut"}
                        onChange={() =>
                          setOutStatus({ ...outStatus, [player.id]: "notOut" })
                        }
                        required
                      />
                      <label htmlFor={`notOut${player.id}`}>Not Out</label>

                      <input
                        type="radio"
                        id={`out${player.id}`}
                        name={`outStatus${player.id}`}
                        value="out"
                        checked={outStatus[player.id] === "out"}
                        onChange={() =>
                          setOutStatus({ ...outStatus, [player.id]: "out" })
                        }
                      />
                      <label htmlFor={`out${player.id}`}>Out</label>
                    </div>
                  </div>
                  {outStatus[player.id] === "out" && (
                    <div className="out-options">
                      <legend style={{ textAlign: "center" }}>
                        If Out, How?
                      </legend>
                      <div className="radio-group">
                        {[
                          "catchOut",
                          "runOut",
                          "stumpOut",
                          "bowledOut",
                          "lbw",
                          "others",
                        ].map((type) => (
                          <React.Fragment key={type}>
                            <input
                              type="radio"
                              id={`${type}${player.id}`}
                              name={`outType${player.id}`}
                              value={type}
                              checked={outType[player.id] === type}
                              onChange={() =>
                                setOutType({ ...outType, [player.id]: type })
                              }
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
                          <input
                            type="text"
                            name={`runOutReason${player.id}`}
                            placeholder="Enter reason for Out"
                          />
                          <input
                            type="text"
                            name={`fielder1${player.id}`}
                            placeholder="Who is the bowler?"
                          />
                          <input
                            type="text"
                            name={`fielder2${player.id}`}
                            placeholder="no of over :ex-4.2 (4 th over 2 nd"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <label style={{ textAlign: "center" }}>Player Role</label>
                  <div className="radio-group">
                    {["Bowlers", "Batters", "Wicket Keeper", "All Rounder"].map(
                      (role) => (
                        <React.Fragment key={role}>
                          <input
                            type="radio"
                            id={`${role.replace(/\s/g, "")}${player.id}`}
                            name={`role${player.id}`}
                            value={role}
                            checked={playerRoles[player.id] === role}
                            onChange={() =>
                              setPlayerRoles({
                                ...playerRoles,
                                [player.id]: role,
                              })
                            }
                          />
                          <label
                            htmlFor={`${role.replace(/\s/g, "")}${player.id}`}
                          >
                            {role}
                          </label>
                        </React.Fragment>
                      )
                    )}
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
                    <button
                      type="button"
                      className="add-button"
                      onClick={addOver}
                    >
                      +
                    </button>
                  </div>
                  <label>
                    Total Runs *
                    <input type="number" name={`runs${player.id}`} required />
                  </label>
                  <label>
                    Total Wickets *
                    <input
                      type="number"
                      name={`wickets${player.id}`}
                      required
                    />
                  </label>
                  <label>
                    Balls *
                    <input type="number" name={`balls${player.id}`} required />
                  </label>
                  <label>
                    Total Fours *
                    <input type="number" name={`fours${player.id}`} required />
                  </label>
                  <label>
                    Total Sixes *
                    <input type="number" name={`sixes${player.id}`} required />
                  </label>
                  <label>
                    Balls Faced *
                    <input
                      type="number"
                      name={`ballsFaced${player.id}`}
                      required
                    />
                  </label>
                  <label>
                    Any Record..
                    <textarea
                      name={`suggestions${player.id}`}
                      maxLength={194}
                    />
                  </label>
                  <div className="button-container">
                    <button
                      type="button"
                      onClick={() => deletePlayer(player.id)}
                      className="btn"
                    >
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

export default OurPlayers;

{
  /*import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const OurPlayers = () => {
  const location = useLocation();
  const matchCode = location.state?.matchCode || "";

  const createDefaultPlayer = () => ({
    matchCode: matchCode,
    playerName: "",
    playerRole: "",
    battingPosition: "",
    runs: "",
    ballsFaced: "",
    sixers: "",
    fours: "",
    isOut: "",
    outMethode: "",
    fielder1: "",
    fielder2: "",
    bowler: "",
    outOverBall: "",
    record: "",
    overNumber: "",
    runsInOver: "",
    extrasInOver: "",
    wicketBalls: "",
    oversBowled: "",
    maidenOvers: "",
    runsGiven: "",
    wicketsTaken: "",
  }); */
}
