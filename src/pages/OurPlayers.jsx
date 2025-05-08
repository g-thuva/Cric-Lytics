import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const OurPlayers = () => {
  const [selected, setSelected] = useState("");
  const { matchCode } = useParams();
  const [players, setPlayers] = useState([{ id: 1 }]);

  const [outStatus, setOutStatus] = useState({});
  const [outType, setOutType] = useState({});

  const [oversData, setOversData] = useState([
    { overs: "", runsGiven: "", whiteBall: "" },
  ]);

  const addPlayer = () => {
    const newId = players.length + 1;
    setPlayers([...players, { id: newId }]);
  };
  const deletePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const addOver = () => {
    setOversData([...oversData, { overs: "", runsGiven: "", whiteBall: "" }]);
  };

  const handleOverChange = (index, event) => {
    const newOversData = [...oversData];
    newOversData[index][event.target.name] = event.target.value;
    setOversData(newOversData);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const playerDetails = players.map((player) => ({
      matchCode: matchCode,
      name: e.target[`playerName${player.id}`].value,
      playerId: e.target[`playerid${player.id}`].value,
      runs: e.target[`runs${player.id}`].value || null,
      wickets: e.target[`wickets${player.id}`].value || null,
      balls: e.target[`balls${player.id}`].value || null,
      fours: e.target[`fours${player.id}`].value || null,
      sixes: e.target[`sixes${player.id}`].value || null,
      ballsFaced: e.target[`ballsFaced${player.id}`].value || null,
      isOut: outStatus[player.id],
      battingPosition: e.target[`position001`].value,

      outType: outType[player.id],
      runOutReason: e.target[`runOutReason${player.id}`]?.value,
      fielder: e.target[`fielder${player.id}`]?.value,
    }));

    const bowlingData = oversData.map((over) => ({
      matchCode: matchCode,
      playerId: e.target[`playerid${over.playerId}`]?.value || null, // Ensure to get playerId for the bowler (might need adjustment)
      overNumber: over.overs,
      runsInOver: over.runsGiven || null,
      extrasInOver: over.whiteBall || null,
      wicketBalls: over.wicketBalls || null, // You might need to adjust this if it's different
    }));

    const fullData = {
      players: playerDetails,
      oversData: oversData,
    };

    try {
      // Post to the player endpoint
      await axios.post(
        "http://localhost:5121/api/Performance/player",
        fullData
      );

      // Post to the bowling endpoint
      await axios.post(
        "http://localhost:5121/api/Performance/bowling",
        bowlingData
      );

      alert("Form Submitted Successfully!");
    } catch (error) {
      alert("Error submitting form");
      console.error(error);
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
                    <input
                      type="text"
                      name={`playerName${player.id}`}
                      required
                    />
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
                    </fieldset>
                  </h1>{" "}
                  <div>
                    <br />
                    {/*out not out methode*/}
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
                        value={false}
                        checked={outStatus[player.id] === false}
                        onChange={() =>
                          setOutStatus({ ...outStatus, [player.id]: false })
                        }
                        required
                      />
                      <label htmlFor={`notOut${player.id}`}>Not Out</label>

                      <input
                        type="radio"
                        id={`out${player.id}`}
                        name={`outStatus${player.id}`}
                        value={true}
                        checked={outStatus[player.id] === true}
                        onChange={() =>
                          setOutStatus({ ...outStatus, [player.id]: true })
                        }
                      />
                      <label htmlFor={`out${player.id}`}>Out</label>
                    </div>

                    {outStatus[player.id] === true && (
                      <div className="out-options">
                        <legend style={{ textAlign: "center" }}>
                          If Out, How?
                        </legend>
                        <div className="radio-group">
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
                                id={`${type}${player.id}`}
                                name={`outMethod${player.id}`}
                                value={type}
                                checked={outType[player.id] === type}
                                onChange={() =>
                                  setOutType({ ...outType, [player.id]: type })
                                }
                              />
                              <label htmlFor={`${type}${player.id}`}>
                                {type === "caught"
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
                      </div>
                    )}

                    {/*out type related fielder 1,filder2,bowler,wicket over*/}

                    {outType[player.id] && (
                      <div className="run-out-text">
                        <input
                          type="text"
                          name={`runOutReason${player.id}`}
                          placeholder="BowlerName:"
                        />

                        <input
                          type="text"
                          name={`runOutReason${player.id}`}
                          placeholder="Reason Fielder  1"
                        />
                        <input
                          type="text"
                          name={`runOutReason${player.id}`}
                          placeholder="Reason Fielder  2"
                        />

                        <input
                          type="text"
                          name={`fielder2${player.id}`}
                          placeholder="wicket at :ex-4.2 (4 th over 2 nd"
                        />
                      </div>
                    )}
                  </div>
                  <label>
                    Total Runs *
                    <input type="number" name={`runs${player.id}`} />
                  </label>
                  <label>
                    Total Fours *
                    <input type="number" name={`fours${player.id}`} />
                  </label>
                  <label>
                    Total Sixes *
                    <input type="number" name={`sixes${player.id}`} />
                  </label>
                  <label>
                    Balls Faced *
                    <input type="number" name={`ballsFaced${player.id}`} />
                  </label>
                  <div className="form-container" id="formContainer">
                    <label>If Bowller..........</label>

                    <label>Over *</label>
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
                    Total Wickets *
                    <input type="number" name={`wickets${player.id}`} />
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
                <button type="submit" className="btn">
                  Submit the form
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

//http://localhost:5121/api/Performance/player
//http://localhost:5121/api/Performance/bowling

/*  "performanceID": 0,
  "matchCode": "Test001",
  "playerID": "PL002",
  "playerName": "abhi",
  "role": "bowler",
  "battingPosition": 1,
  "runs": 12,
  "ballsFaced": 2,
  "sixes": 2,
  "fours": 0,
  "isOut": true,
  "outMethod": "caught",
  "fielder1": "manoj",
  "fielder2": "kenu",
  "bowler": "babi",
  "outOverBall": "0.2",
  "record": "long sixes"
  .......

{
  "overPerformanceID": 1,
  "matchCode": "Test001",
  "playerID": "PL032",
  "playerName": "Shaanu",
  "overNumber": 2,
  "runsInOver": 22,
  "extrasInOver": 1,
  "wicketBalls": "1.1"
}
}'*/
