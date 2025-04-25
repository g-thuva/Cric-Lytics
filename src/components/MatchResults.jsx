import { useState, useEffect } from "react";
import axios from "axios";

const MatchResults = () => {
  const [matchResults, setMatchResults] = useState([]);

  // Fetching data from the backend API
  useEffect(() => {
    axios
      .get("https://localhost:7115/api/MatchResults") // API endpoint
      .then((response) => {
        console.log("Data fetched from backend:", response.data);

        setMatchResults(response.data); // Set the data to state
      })
      .catch((error) => {
        console.error("There was an error fetching match results!", error);
      });
  }, []);

  return (
    <div>
      <h1>Match Results</h1>
      <table>
        <thead>
          <tr>
            <th>Match Number</th>
            <th>Match Team</th>
            <th>Result</th>
            <th>Winning Score</th>
            <th>Losing Score</th>
          </tr>
        </thead>
        <tbody>
          {matchResults.length > 0 ? (
            matchResults.map((result) => (
              <tr key={result.id}>
                <td>{result.matchNumber}</td>
                <td>{result.matchTeam}</td>
                <td>{result.result}</td>
                <td>{result.winningScore}</td>
                <td>{result.losingScore}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No match results available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MatchResults;
