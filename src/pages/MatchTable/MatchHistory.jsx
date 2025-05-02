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
  const [match, setMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // serching
  const [typeFilter, setTypeFilter] = useState(""); // type
  const [statusFilter, setStatusFilter] = useState(""); //staus
  const [venuFilter, setVenuFilter] = useState(""); // venu

  const navigate = useNavigate();

  useEffect(() => {
    const monkMatches = [
      {
        id: 1,
        sno: 1,
        date: "3rd jan",
        team: "kandy cric",
        status: "lost",
        score: {
          innings1: 254,
          innings2: 250,
        },
        type: "T20",
        venu: "Jaffna",
      },

      {
        id: 2,
        sno: 2,
        date: "4th jan",
        team: "batti cric",
        status: "win",
        score: {
          innings1: 236,
          innings2: 199,
        },
        type: "Test",
        venu: "Kandy",
      },

      {
        id: 3,
        sno: 3,
        date: "5th jan",
        team: "ampara cric",
        status: "lost",
        score: {
          innings1: 136,
          innings2: 199,
        },
        type: "Test",
        venu: "Kandy",
      },

      {
        id: 4,
        sno: 4,
        date: "4th jan",
        team: "batti cric",
        status: "win",
        score: {
          innings1: 400,
          innings2: 199,
        },
        type: "Test",
        venu: "Batti",
      },

      {
        id: 5,
        sno: 5,
        date: "4th jan",
        team: "jaffna cric",
        status: "win",
        score: {
          innings1: 236,
          innings2: 199,
        },
        type: "Test",
        venu: "Ampara",
      },

      {
        id: 6,
        sno: 6,
        date: "5th jan",
        team: "jaffna cric",
        status: "lost",
        score: {
          innings1: 236,
          innings2: 199,
        },
        type: "ODI",
        venu: "Ampara",
      },
    ];

    setMatches(monkMatches);
  }, []);

  const filteredMatches = match.filter((match) => {
    const matchesSearch = match.team // search by team
      .toLowerCase()
      .includes(searchTerm.toLowerCase()); //search box

    const matchesType =
      typeFilter === "" ||
      match.type.toLowerCase() === typeFilter.toLowerCase(); // filtering type

    const matchesVenu =
      venuFilter === "" ||
      match.venu.toLowerCase() === venuFilter.toLowerCase(); // filtering venu

    const matchesStatus =
      statusFilter === "" ||
      match.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesVenu && matchesStatus;
  });
  //.sort((a, b) => a.sno - b.sno); // Sort by match number (sno)

  const handleScoreCard = (matchId) => {
    navigate(`/ScoreCard/${matchId}`);
  };

  const handleUpcomingMatches = () => {
    navigate("/upcoming-matches"); // Match the path here
  };

  const handleAddMatches = () => {
    navigate("/medical-form"); // This should route to the medical form page
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
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select //OPTIONS OF TYPE
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="type-filter"
            >
              <option value="">All Type</option>
              <option value="T20">T20</option>
              <option value="Test">Test</option>
              <option value="ODI">ODI</option>
            </select>

            <select //OPTIONS OF VENU
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

            <select //OPTIONS OF satus
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="type-filter"
            >
              <option value="">All Staus</option>
              <option value="win"> Win</option>
              <option value="lost">Lost</option>
              <option value="drow">Drow</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="matchhistory-table">
          <thead>
            <tr>
              <th>M.No</th>
              <th>Date</th>
              <th>Team</th>
              <th>Status</th>
              <th>Score</th>
              <th>Type</th>
              <th>Venu</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map((match) => (
              <tr
                key={match.id}
                className={match.status === "win" ? "Win" : ""}
              >
                <td>{match.sno}</td>
                <td>{match.date}</td>
                <td className="team-cell">
                  <img
                    src={logoMap[match.team.toLowerCase()]}
                    alt={match.team}
                    className="team-logo"
                  />
                  <span className="team-name">{match.team}</span>
                </td>

                <td className={`status ${match.status.toLowerCase()}`}>
                  {match.status}
                </td>
                <td>
                  {match.score.innings1} / {match.score.innings2}
                </td>
                <td>{match.type}</td>
                <td>{match.venu}</td>
                <td>
                  <button
                    className="view-scorecard-btn"
                    onClick={() => handleScoreCard(match.id)}
                  >
                    More
                  </button>
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
