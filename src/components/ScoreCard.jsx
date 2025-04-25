import "./ScoreCard.css";
//import { useParams } from "react-router-dom";

const ScoreCard = () => {
  //const { matchId } = useParams();
  const matchInfo = {
    teams: {
      batting: "Kandy Cric",
      bowling: "Ampara Cric",
    },
    result: "Ampara Cric won by 8 wickets (57 balls left)",
    totalScore: 114,
    totalWickets: 2,
    overs: 10.3,
  };

  const battingData1 = [
    {
      name: "Thisok (Wk)",
      runs: 39,
      balls: 32,
      fours: 5,
      sixes: 2,
      strikeRate: 121.88,
      dismissal: "lbw b babi",
    },
    {
      name: "Abhi",
      runs: 6,
      balls: 2,
      fours: 0,
      sixes: 1,
      strikeRate: 300.0,
      dismissal: "c kenu b shaanu",
    },
    {
      name: "Chajay",
      runs: 52,
      balls: 26,
      fours: 4,
      sixes: 3,
      strikeRate: 200.0,
      dismissal: "not out",
    },
    {
      name: "Thuva (C)",
      runs: 6,
      balls: 3,
      fours: 1,
      sixes: 0,
      strikeRate: 200.0,
      dismissal: "not out",
    },
  ];

  const extras = { wides: 5, byes: 4, legByes: 2, total: 11 };

  const fallOfWickets = [
    "11/1 (S. Narine, 1.2 ov)",
    "102/2 (R. Gurbaz, 8.5 ov)",
  ];

  const bowlingData1 = [
    { name: "B. Kumar", overs: 2, runs: 25, wickets: 0, economy: 12.5 },
    { name: "P. Cummins (C)", overs: 2, runs: 18, wickets: 1, economy: 9.0 },
    { name: "T. Natarajan", overs: 2, runs: 29, wickets: 0, economy: 14.5 },
    { name: "S. Ahmed", overs: 2.3, runs: 22, wickets: 1, economy: 8.8 },
    { name: "J. Unadkat", overs: 1, runs: 9, wickets: 0, economy: 9.0 },
    { name: "A. Markram", overs: 1, runs: 5, wickets: 0, economy: 5.0 },
  ];

  //second inning data
  const battingData2 = [
    {
      name: "manoj",
      runs: 45,
      balls: 34,
      fours: 6,
      sixes: 1,
      strikeRate: 132.35,
      dismissal: "niroji",
    },
    {
      name: "abhi",
      runs: 22,
      balls: 15,
      fours: 3,
      sixes: 1,
      strikeRate: 146.67,
      dismissal: "kutty donS",
    },
    {
      name: "shanjana",
      runs: 67,
      balls: 38,
      fours: 5,
      sixes: 4,
      strikeRate: 176.32,
      dismissal: "c renu b athmi",
    },
    {
      name: "dinuja (C) (Wk)",
      runs: 35,
      balls: 22,
      fours: 2,
      sixes: 2,
      strikeRate: 159.09,
      dismissal: "not out",
    },
  ];

  const fallOfWickets2 = [
    "48/1 (P. piri, 5.3 ov)",
    "120/2 (renu, 12.4 ov)",
    "145/3 (athmi, 16.2 ov)",
  ];

  const bowlingData2 = [
    { name: "shanjana", overs: 3, runs: 24, wickets: 1, economy: 8.0 },
    { name: "thuva", overs: 4, runs: 35, wickets: 1, economy: 8.75 },
    { name: "chajay", overs: 4, runs: 28, wickets: 1, economy: 7.0 },
    { name: "abhi", overs: 4, runs: 42, wickets: 0, economy: 10.5 },
    { name: "thisok", overs: 2, runs: 18, wickets: 0, economy: 9.0 },
  ];

  return (
    <div className="scorecard-container">
      <div className="scorecard-result">
        {" "}
        <h2>
          {matchInfo.teams.batting} vs {matchInfo.teams.bowling}
        </h2>
        <h3>{matchInfo.result}</h3>
      </div>

      <div className="scorecard-both-innings">
        <div className="scorecard1">
          <div className="batting-section">
            <h4>First Innings</h4>
            <h4>Batting</h4>
            <table className="scorecard-table-batting">
              <thead>
                <tr>
                  <th>Batsman</th>
                  <th>R</th>
                  <th>B</th>
                  <th>4s</th>
                  <th>6s</th>
                  <th>S/R</th>
                  <th>Dismissal</th>
                </tr>
              </thead>
              <tbody>
                {battingData1.map((player, index) => (
                  <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.runs}</td>
                    <td>{player.balls}</td>
                    <td>{player.fours}</td>
                    <td>{player.sixes}</td>
                    <td>{player.strikeRate}</td>
                    <td>{player.dismissal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="extras">
            <p>
              Extras: {extras.total} (W {extras.wides}, B {extras.byes}, LB{" "}
              {extras.legByes})
            </p>
          </div>

          <div className="fall-of-wickets">
            <h4>Fall of Wickets</h4>
            <p>{fallOfWickets.join(" · ")}</p>
          </div>

          <div className="bowling-section">
            <h4>Bowling</h4>
            <table className="scorecard-table-bowlling">
              <thead>
                <tr>
                  <th>Bowler</th>
                  <th>O</th>
                  <th>R</th>
                  <th>W</th>
                  <th>Eco</th>
                </tr>
              </thead>
              <tbody>
                {bowlingData1.map((bowler, index) => (
                  <tr key={index}>
                    <td>{bowler.name}</td>
                    <td>{bowler.overs}</td>
                    <td>{bowler.runs}</td>
                    <td>{bowler.wickets}</td>
                    <td>{bowler.economy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Second Inning Scorecard */}
        <div className="scorecard2">
          <h4>Second Inning</h4>
          <div className="batting-section">
            <h4>Batting</h4>
            <table className="scorecard-table-batting">
              <thead>
                <tr>
                  <th>Batsman</th>
                  <th>R</th>
                  <th>B</th>
                  <th>4s</th>
                  <th>6s</th>
                  <th>S/R</th>
                  <th>Dismissal</th>
                </tr>
              </thead>
              <tbody>
                {battingData2.map((player, index) => (
                  <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.runs}</td>
                    <td>{player.balls}</td>
                    <td>{player.fours}</td>
                    <td>{player.sixes}</td>
                    <td>{player.strikeRate}</td>
                    <td>{player.dismissal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="extras">
            <p>
              Extras: {extras.total} (W {extras.wides}, B {extras.byes}, LB{" "}
              {extras.legByes})
            </p>
          </div>

          <div className="fall-of-wickets">
            <h4>Fall of Wickets</h4>
            <p>{fallOfWickets2.join(" · ")}</p>
          </div>

          <div className="bowling-section">
            <h4>Bowling</h4>
            <table className="scorecard-table-bowlling">
              <thead>
                <tr>
                  <th>Bowler</th>
                  <th>O</th>
                  <th>R</th>
                  <th>W</th>
                  <th>Eco</th>
                </tr>
              </thead>
              <tbody>
                {bowlingData2.map((bowler, index) => (
                  <tr key={index}>
                    <td>{bowler.name}</td>
                    <td>{bowler.overs}</td>
                    <td>{bowler.runs}</td>
                    <td>{bowler.wickets}</td>
                    <td>{bowler.economy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
