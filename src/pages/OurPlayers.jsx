//http://localhost:5121/api/Performance/player
//http://localhost:5121/api/Performance/bowling

/*import React, { useState } from "react";
import axios from "axios";

const OurPlayers = () => {
  const [selected, setSelected] = useState("");
  const [battingPosition, setBattingPosition] = useState();
  const [outStatus, setOutStatus] = useState();
  const [outType, setOutType] = useState();
  const [players, setPlayers] = useState([]);
  const [matchCode, setMatchCode] = useState(""); // to persist matchCode across players

  const addPlayer = (e) => {
    e.preventDefault();
    const form = e.target;

    const playerData = {
      matchCode: form.matchcode.value,
      playerId: e.target.playerId.value,
      playerName: form.playerName.value,
      runs: form.runs.value || null,
      sixers: form.sixes.value || null,
      fours: form.fours.value || null,
      totalWicket: form.totalWicket.value || null,
      totalBall: form.totalBall.value || null,
      ballsFaced: form.ballsFaced.value || null,
      isOut: outStatus,
      battingPosition: battingPosition,
      outType: outType,
      outOverBall: form.outOverBall?.value || null,
      bowler: form.bowler?.value || null,
      fielder1: form.fielder1?.value || null,
      fielder2: form.fielder2?.value || null,
      record: form.record?.value || null,
    };

    setMatchCode(form.matchcode.value);
    setPlayers([...players, playerData]);
    form.reset();
    setBattingPosition();
    setOutStatus();
    setOutType();
    alert("Player added!");
  };

  const submitAllPlayers = async () => {
    try {
      // Make a POST request to submit multiple players at once
      await axios.post(
        "http://localhost:5121/api/Performance/player/multiple",
        players
      );
      alert("All players submitted successfully!");

      // Clear the players and matchCode state after submission
      setPlayers([]);
      setMatchCode("");
    } catch (error) {
      alert("Error submitting all players");
      console.error(error);
    }
  };

  return (
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

            <form id="matchForm" onSubmit={addPlayer}>
              <label>
                MatchCode*
                <input
                  type="text"
                  name="matchcode"
                  required
                  defaultValue={matchCode}
                />
              </label>

              <label>
                Player ID *
                <input type="text" name="playerId" required />
              </label>

              <label>
                Player Name *
                <input type="text" name="playerName" required />
              </label>

              <fieldset className="radio-group">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((pos) => (
                  <React.Fragment key={pos}>
                    <input
                      type="radio"
                      id={`pos${pos}`}
                      name="battingPosition"
                      value={pos}
                      checked={battingPosition === pos}
                      onChange={() => setBattingPosition(pos)}
                      required
                    />
                    <label htmlFor={`pos${pos}`}>{pos}</label>
                  </React.Fragment>
                ))}
              </fieldset>

              <div className="radio-group">
                <input
                  type="radio"
                  id="notOut"
                  name="outStatus"
                  value={false}
                  checked={outStatus === false}
                  onChange={() => setOutStatus(false)}
                  required
                />
                <label htmlFor="notOut">Not Out</label>

                <input
                  type="radio"
                  id="out"
                  name="outStatus"
                  value={true}
                  checked={outStatus === true}
                  onChange={() => setOutStatus(true)}
                />
                <label htmlFor="out">Out</label>
              </div>

              {outStatus === true && (
                <>
                  <fieldset className="radio-group">
                    {[
                      "caught",
                      "runOut",
                      "stumpOut",
                      "bowledOut",
                      "lbw",
                      "others",
                    ].map((type) => (
                      <React.Fragment key={type}>
                        <input
                          type="radio"
                          id={type}
                          name="outType"
                          value={type}
                          checked={outType === type}
                          onChange={() => setOutType(type)}
                        />
                        <label htmlFor={type}>{type}</label>
                      </React.Fragment>
                    ))}
                  </fieldset>

                  <input type="text" name="bowler" placeholder="Bowler Name" />
                  <input type="text" name="fielder1" placeholder="Fielder 1" />
                  <input type="text" name="fielder2" placeholder="Fielder 2" />
                  <input
                    type="text"
                    name="outOverBall"
                    placeholder="Wicket at: e.g. 4.2"
                  />
                </>
              )}

              <label>
                Runs
                <input type="number" name="runs" />
              </label>
              <label>
                Fours
                <input type="number" name="fours" />
              </label>
              <label>
                Sixes
                <input type="number" name="sixes" />
              </label>
              <label>
                Balls Faced
                <input type="number" name="ballsFaced" />
              </label>
              <label>
                Total Wickets
                <input type="number" name="totalWicket" />
              </label>
              <label>
                Total Balls Bowled
                <input type="number" name="totalBall" />
              </label>
              <label>
                Record
                <textarea name="record" maxLength={194} />
              </label>

              <button type="submit" className="btn">
                Add Player
              </button>
            </form>

            {players.length > 0 && (
              <>
                <h3>{players.length} player(s) added</h3>
                <button className="btn" onClick={submitAllPlayers}>
                  Submit All Players
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OurPlayers;
*/

import React, { useState } from "react";
import axios from "axios";

const OurPlayers = () => {
  const [selected, setSelected] = useState("");
  const [battingPosition, setBattingPosition] = useState();
  const [outStatus, setOutStatus] = useState();
  const [outMethod, setOutMethod] = useState(null);
  const [players, setPlayers] = useState([]);
  const [matchCode, setMatchCode] = useState(""); // to persist matchCode across players

  // State for managing multiple overs
  const [bowlingOvers, setBowlingOvers] = useState([
    { overNumber: "", runsInOver: "", extrasInOver: "", wicketBalls: "" },
  ]);

  const handleAddBowlingOver = () => {
    setBowlingOvers([
      ...bowlingOvers,
      { overNumber: "", runsInOver: "", extrasInOver: "", wicketBalls: "" },
    ]);
  };

  // Handle change in bowling over input
  const handleBowlingOverChange = (index, e) => {
    const values = [...bowlingOvers];
    values[index][e.target.name] = e.target.value;
    setBowlingOvers(values);
  };

  const addPlayer = (e) => {
    e.preventDefault();
    const form = e.target;

    const currentOutMethod = outMethod;
    const currentOutStatus = outStatus;

    const playerData = {
      matchCode: form.matchcode.value,
      playerId: e.target.playerId.value,
      playerName: form.playerName.value,
      runs: form.runs.value || null,
      sixes: form.sixes.value || null,
      fours: form.fours.value || null,
      totalWicket: form.totalWicket.value || null,
      totalBall: form.totalBall.value || null,
      ballsFaced: form.ballsFaced.value || null,
      isOut: currentOutStatus,
      battingPosition: battingPosition,
      outMethod: currentOutMethod || null,
      outOverBall: form.outOverBall?.value || null,
      bowler: form.bowler?.value || null,
      fielder1: form.fielder1?.value || null,
      fielder2: form.fielder2?.value || null,
      record: form.record?.value || null,

      bowlingOvers: bowlingOvers, // Add bowling overs details
    };

    setMatchCode(form.matchcode.value);
    setPlayers([...players, playerData]);
    form.reset();
    setBattingPosition();
    setOutStatus();
    setOutMethod();

    setBowlingOvers([
      { overNumber: "", runsInOver: "", extrasInOver: "", wicketBalls: "" },
    ]); // Reset overs

    alert("Player added!");
  };

  const submitAllPlayers = async () => {
    try {
      // Make a POST request to submit multiple players at once
      await axios.post(
        "http://localhost:5121/api/Performance/playerWithBowling",
        players
      );
      alert("All players submitted successfully!");

      // Clear the players and matchCode state after submission
      setPlayers([]);
      setMatchCode("");
      setOutStatus();
      setOutMethod();
    } catch (error) {
      alert("Error submitting all players");
      console.error(error);
    }
  };

  return (
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

            <form id="matchForm" onSubmit={addPlayer}>
              <label>
                MatchCode*
                <input
                  type="text"
                  name="matchcode"
                  required
                  defaultValue={matchCode}
                />
              </label>

              <label>
                Player ID *
                <input type="text" name="playerId" required />
              </label>

              <label>
                Player Name *
                <input type="text" name="playerName" required />
              </label>

              <fieldset className="radio-group">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((pos) => (
                  <React.Fragment key={pos}>
                    <input
                      type="radio"
                      id={`pos${pos}`}
                      name="battingPosition"
                      value={pos}
                      checked={battingPosition === pos}
                      onChange={() => setBattingPosition(pos)}
                      required
                    />
                    <label htmlFor={`pos${pos}`}>{pos}</label>
                  </React.Fragment>
                ))}
              </fieldset>

              <div className="radio-group">
                <input
                  type="radio"
                  id="notOut"
                  name="outStatus"
                  value="false"
                  checked={outStatus === false}
                  onChange={() => {
                    setOutStatus(false);
                    setOutMethod(null); // Clear outType when not out
                  }}
                  required
                />
                <label htmlFor="notOut">Not Out</label>

                <input
                  type="radio"
                  id="out"
                  name="outStatus"
                  value={true}
                  checked={outStatus === true}
                  onChange={() => setOutStatus(true)}
                />
                <label htmlFor="out">Out</label>
              </div>

              {outStatus === true && (
                <>
                  <fieldset className="radio-group">
                    <legend>Out Type</legend>
                    {[
                      "caught",
                      "runOut",
                      "stumpOut",
                      "bowledOut",
                      "lbw",
                      "others",
                    ].map((type) => (
                      <React.Fragment key={type}>
                        <input
                          type="radio"
                          id={type}
                          name="outType"
                          value={type}
                          checked={outMethod === type}
                          onChange={(e) => setOutMethod(e.target.value)}
                        />
                        <label htmlFor={type}>{type}</label>
                      </React.Fragment>
                    ))}
                  </fieldset>

                  <input type="text" name="bowler" placeholder="Bowler Name" />
                  <input type="text" name="fielder1" placeholder="Fielder 1" />
                  <input type="text" name="fielder2" placeholder="Fielder 2" />
                  <input
                    type="text"
                    name="outOverBall"
                    placeholder="Wicket at: e.g. 4.2"
                  />
                </>
              )}

              <label>
                Runs
                <input type="number" name="runs" />
              </label>
              <label>
                Fours
                <input type="number" name="fours" />
              </label>
              <label>
                Sixes
                <input type="number" name="sixes" />
              </label>
              <label>
                Balls Faced
                <input type="number" name="ballsFaced" />
              </label>
              <label>
                Total Wickets
                <input type="number" name="totalWicket" />
              </label>
              <label>
                Total Balls Bowled
                <input type="number" name="totalBall" />
              </label>
              <label>
                Record
                <textarea name="record" maxLength={194} />
              </label>

              <h3>Bowling Overs</h3>
              {bowlingOvers.map((over, index) => (
                <div key={index}>
                  <label>
                    Over Number:
                    <input
                      type="number"
                      name="overNumber"
                      value={over.overNumber}
                      onChange={(e) => handleBowlingOverChange(index, e)}
                    />
                  </label>
                  <label>
                    Runs in Over:
                    <input
                      type="number"
                      name="runsInOver"
                      value={over.runsInOver}
                      onChange={(e) => handleBowlingOverChange(index, e)}
                    />
                  </label>
                  <label>
                    Extras in Over:
                    <input
                      type="number"
                      name="extrasInOver"
                      value={over.extrasInOver}
                      onChange={(e) => handleBowlingOverChange(index, e)}
                    />
                  </label>
                  <label>
                    Wicket Balls:
                    <input
                      type="text"
                      name="wicketBalls"
                      value={over.wicketBalls}
                      onChange={(e) => handleBowlingOverChange(index, e)}
                    />
                  </label>
                </div>
              ))}

              <button type="button" onClick={handleAddBowlingOver}>
                Add Bowling Over
              </button>

              <button type="submit" className="btn">
                Add Player
              </button>
            </form>

            {players.length > 0 && (
              <>
                <h3>{players.length} player(s) added</h3>
                <button className="btn" onClick={submitAllPlayers}>
                  Submit All Players
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OurPlayers;
