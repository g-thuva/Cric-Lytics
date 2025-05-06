import "../../css/MatchHistory.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import kandyLogo from "../images/7.jpg";
import jaffnaLogo from "../images/1.jpeg";
import amparaLogo from "../images/2.png";
import kurunagalLogo from "../images/11.jpg";
import vavuniyaLogo from "../images/6.jpg";
import battiLogo from "../images/5.avif";
import colomboLogo from "../images/12.avif";

const logoMap = {
  "kandy cric": kandyLogo,
  "jaffna cric": jaffnaLogo,
  "ampara cric": amparaLogo,
  "kurunagal cric": kurunagalLogo,
  "vavuniya cric": vavuniyaLogo,
  "batti cric": battiLogo,
  "colombo cric": colomboLogo,
};

const MatchHistory = () => {
  const [match, setMatch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [venuFilter, setVenuFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this match?"
    );
    if (confirmed) {
      const updatedMatches = match.filter((m) => m.matchId !== id);
      setMatch(updatedMatches);
    }
  };

  const handleReset = (id) => {
    navigate("/OurTeam", { state: { matchId: id } });
  };

  useEffect(() => {
    fetch("http://localhost:5121/api/MatchEntry")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch match data");
        return res.json();
      })
      .then((data) => {
        setMatch(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Enum mappings for display
  const mapMatchStatus = (status) => {
    switch (status) {
      case 0:
        return "Won";
      case 1:
        return "Lost";
      case 2:
        return "Draw";
      default:
        return "Unknown";
    }
  };

  const mapMatchType = (type) => {
    switch (type) {
      case 0:
        return "T20";
      case 1:
        return "Test";
      case 2:
        return "ODI";
      default:
        return "Unknown";
    }
  };

  const mapFirstInnings = (firstInnings) => {
    switch (firstInnings) {
      case 0:
        return "Batting";
      case 1:
        return "Bowling";
      default:
        return "Unknown"; // Fallback if value is unexpected
    }
  };

  const filteredMatches = match.filter((match) => {
    const matchesSearch = match.oppositeTeamName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "" || mapMatchType(match.matchType) === typeFilter;
    const matchesVenu = venuFilter === "" || match.venue === venuFilter;
    const matchesStatus =
      statusFilter === "" || mapMatchStatus(match.matchStatus) === statusFilter;

    return matchesSearch && matchesType && matchesVenu && matchesStatus;
  });

  const handleScoreCard = (matchId) => {
    navigate(`/ScoreCard/${matchId}`);
  };

  const handleUpcomingMatches = () => {
    navigate("/upcoming-matches");
  };

  const handleAddMatches = () => {
    navigate("/OurTeam");
  };

  return (
    <div className="matchhistory-container">
      <h1>Match History</h1>
      <div className="btn-container">
        <button
          className="upcoming-matches-btn"
          onClick={handleUpcomingMatches}
        >
          Upcoming Matches
        </button>
        <button className="add-matches-btn" onClick={handleAddMatches}>
          Add match
        </button>
      </div>

      <div className="controls-container">
        <div className="control-groups">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="type-filter"
            >
              <option value="">All Type</option>
              <option value="T20">T20</option>
              <option value="Test">Test</option>
              <option value="ODI">ODI</option>
            </select>

            <select
              value={venuFilter}
              onChange={(e) => setVenuFilter(e.target.value)}
              className="type-filter"
            >
              <option value="">All Venue</option>
              <option value="Kandy">Kandy</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Ampara">Ampara</option>
              <option value="Batti">Batti</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="type-filter"
            >
              <option value="">All Status</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="Draw">Draw</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="matchhistory-table">
          <thead>
            <tr>
              <th>Match Code</th>
              <th>Date</th>
              <th>Team</th>
              <th>Status</th>
              <th>Score</th>
              <th>Type</th>
              <th>Venue</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map((match) => (
              <tr
                key={match.matchId}
                className={
                  mapMatchStatus(match.matchStatus) === "Won"
                    ? "won"
                    : mapMatchStatus(match.matchStatus) === "Lost"
                    ? "lost"
                    : mapMatchStatus(match.matchStatus) === "Draw"
                    ? "draw"
                    : ""
                }
              >
                <td>{match.matchCode}</td>
                <td>{new Date(match.matchDate).toLocaleDateString()}</td>
                <td>{match.oppositeTeamName}</td>
                <td
                  className={`status ${mapMatchStatus(
                    match.matchStatus
                  ).toLowerCase()}`}
                >
                  {mapMatchStatus(match.matchStatus)}
                </td>

                <td>{/* Score can be added later */}</td>
                <td>{mapMatchType(match.matchType)}</td>
                <td>{match.venue}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="view-scorecard-btn"
                      onClick={() => handleScoreCard(match.matchId)}
                    >
                      More
                    </button>
                    <button
                      className="reset-btn"
                      onClick={() => handleReset(match.matchId)}
                    >
                      Reset
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(match.matchId)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchHistory;
