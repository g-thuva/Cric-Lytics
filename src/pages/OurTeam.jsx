import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OurPlayers = () => {
  const [matchData, setMatchData] = useState({
    matchCode: "",
    matchDate: "",
    oppositeTeamName: "",
    tossResult: "", // 0 = Won, 1 = Lost
    firstInnings: "", // 0 = Batting, 1 = Bowling
    matchStatus: "", // 0 = Won, 1 = Lost, 2 = Draw
    venue: "",
    matchType: "", // 0 = T20, 1 = Test, 2 = ODI
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchData((prevState) => ({
      ...prevState,
      [name]: [
        "tossResult",
        "firstInnings",
        "matchStatus",
        "matchType",
      ].includes(name)
        ? parseInt(value)
        : value,
    }));
  };

  const handleOurPlayer = () => {
    navigate("/our-players");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5002/api/MatchEntry",
        matchData
      );

      console.log(response.data);

      alert("Match data submitted successfully!");
      navigate("/OurPlayers");

      // Reset form after submission
      setMatchData({
        matchCode: "",
        matchDate: "",
        oppositeTeamName: "",
        tossResult: "",
        firstInnings: "",
        matchStatus: "",
        venue: "",
        matchType: "",
      });
    } catch (error) {
      console.error("Error submitting match data:", error);
      alert("Failed to submit match data.");
    }
  };

  return (
    <div className="add_match_data">
      <p>Add Match Data</p>

      <main id="main" className="container">
        <div id="form-container">
          <div id="match-details" className="player-form">
            <form id="matchForm" onSubmit={handleSubmit} className="match-form">
              <h1>Match Data Entry</h1>

              <label>
                Match Code *
                <input
                  type="text"
                  name="matchCode"
                  value={matchData.matchCode}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Match Date *
                <input
                  type="date"
                  name="matchDate"
                  value={matchData.matchDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Opposite Team Name *
                <input
                  type="text"
                  name="oppositeTeamName"
                  value={matchData.oppositeTeamName}
                  onChange={handleChange}
                  required
                />
              </label>
                <br></br>
                <h1><legend style={{ textAlign: "center" }}>Toss Result</legend></h1>

              <fieldset className="radio-group">

                <input
                  type="radio"
                  id="tossWon"
                  name="tossResult"
                  value="0"
                  checked={matchData.tossResult === 0}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="tossWon">Won</label>

                <input
                  type="radio"
                  id="tossLost"
                  name="tossResult"
                  value="1"
                  checked={matchData.tossResult === 1}
                  onChange={handleChange}
                />
                <label htmlFor="tossLost">Lost</label>
              </fieldset>
                <br></br>

                <h1><legend style={{ textAlign: "center" }}>First Innings</legend></h1>

              <fieldset className="radio-group">

                <input
                  type="radio"
                  id="batting"
                  name="firstInnings"
                  value="0"
                  checked={matchData.firstInnings === 0}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="batting">Batting</label>

                <input
                  type="radio"
                  id="bowling"
                  name="firstInnings"
                  value="1"
                  checked={matchData.firstInnings === 1}
                  onChange={handleChange}
                />
                <label htmlFor="bowling">Bowling</label>
              </fieldset>
                <br></br>

                <h1><legend style={{ textAlign: "center" }}>Match Type *</legend></h1>

              <fieldset className="radio-group">


                <input
                  type="radio"
                  id="t20"
                  name="matchType"
                  value="0"
                  checked={matchData.matchType === 0}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="t20">T20</label>

                <input
                  type="radio"
                  id="test"
                  name="matchType"
                  value="1"
                  checked={matchData.matchType === 1}
                  onChange={handleChange}
                />
                <label htmlFor="test">Test</label>

                <input
                  type="radio"
                  id="odi"
                  name="matchType"
                  value="2"
                  checked={matchData.matchType === 2}
                  onChange={handleChange}
                />
                <label htmlFor="odi">ODI</label>
              </fieldset>
              
              <br></br>

              <h1><legend style={{ textAlign: "center" }}>Match Result</legend></h1>

              <fieldset className="radio-group">


                <input
                  type="radio"
                  id="matchWon"
                  name="matchStatus"
                  value="0"
                  checked={matchData.matchStatus === 0}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="matchWon">Won</label>

                <input
                  type="radio"
                  id="matchLost"
                  name="matchStatus"
                  value="1"
                  checked={matchData.matchStatus === 1}
                  onChange={handleChange}
                />
                <label htmlFor="matchLost">Lost</label>

                <input
                  type="radio"
                  id="matchDraw"
                  name="matchStatus"
                  value="2"
                  checked={matchData.matchStatus === 2}
                  onChange={handleChange}
                />
                <label htmlFor="matchDraw">Draw</label>
              </fieldset>

              <label>
                Venue *
                <input
                  type="text"
                  name="venue"
                  value={matchData.venue}
                  onChange={handleChange}
                  required
                />
              </label>
                
                
              <div className="button-container">
              <button className="btn" type="submit">
                Submit Match Data
              </button>
              
              <button className="btn"><a href="/OurPlayers">Player Performance</a></button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OurPlayers;
