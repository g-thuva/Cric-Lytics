/*import "./MatchHistory.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import StarRating from "./StarRating";

const MatchHistory = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockPlayers = [
      {
        id: 1,
        no: 1,
        date: "3rd jan",
        team: "kandy cric",
        staus: "lost",
        score: {
          innings1: 254,
          innings2: 250,
        },

        name: "Virat Kohli",
        role: "Batsman",
        medicalStatus: "win",
        battingStyle: "Right-handed",
        bowlingStyle: "Right-arm medium",
        dob: "1988-11-05",
        rating: 95,
        statistics: {
          matches: 254,
          runs: 12169,
          average: 59.07,
          centuries: 43,
          wickets: 4,
          economy: 5.68,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 2,
        name: "Jasprit Bumrah",
        role: "Bowler",
        medicalStatus: "win",
        battingStyle: "Right-handed",
        bowlingStyle: "Right-arm fast",
        dob: "1993-12-06",
        rating: 90,
        statistics: {
          matches: 72,
          runs: 180,
          average: 7.5,
          centuries: 0,
          wickets: 128,
          economy: 4.62,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 3,
        name: "Ravindra Jadeja",
        role: "All-rounder",
        medicalStatus: "lost",
        battingStyle: "Left-handed",
        bowlingStyle: "Left-arm orthodox",
        dob: "1988-12-06",
        rating: 88,
        statistics: {
          matches: 171,
          runs: 2756,
          average: 37.24,
          centuries: 1,
          wickets: 189,
          economy: 4.92,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 4,
        name: "Rohit Sharma",
        role: "Batsman",
        medicalStatus: "lost",
        battingStyle: "Right-handed",
        bowlingStyle: "Right-arm off break",
        dob: "1987-04-30",
        rating: 92,
        statistics: {
          matches: 227,
          runs: 9283,
          average: 48.6,
          centuries: 29,
          wickets: 8,
          economy: 5.32,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 5,
        name: "Rishabh Pant",
        role: "Wicket-keeper",
        medicalStatus: "win",
        battingStyle: "Left-handed",
        bowlingStyle: "N/A",
        dob: "1997-10-04",
        rating: 85,
        statistics: {
          matches: 54,
          runs: 2271,
          average: 43.67,
          centuries: 5,
          wickets: 0,
          economy: 0,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 6,
        name: "ishabh Pant",
        role: "Wicket-keeper",
        medicalStatus: "win",
        battingStyle: "Left-handed",
        bowlingStyle: "N/A",
        dob: "1997-10-04",
        rating: 85,
        statistics: {
          matches: 54,
          runs: 2271,
          average: 43.67,
          centuries: 5,
          wickets: 0,
          economy: 0,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 7,
        name: "Pant Abh",
        role: "Wicket-keeper",
        medicalStatus: "win",
        battingStyle: "Left-handed",
        bowlingStyle: "N/A",
        dob: "1997-10-04",
        rating: 85,
        statistics: {
          matches: 54,
          runs: 2271,
          average: 43.67,
          centuries: 5,
          wickets: 0,
          economy: 0,
        },
        image: "/placeholder.svg?height=150&width=150",
      },
    ];
    setPlayers(mockPlayers);
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = [...players].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredPlayers = sortedPlayers.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()); //search box
    const matchesRole =
      roleFilter === "" ||
      player.role.toLowerCase() === roleFilter.toLowerCase(); //filter role
    return matchesSearch && matchesRole;
  });

  const handleViewProfile = (playerId) => {
    navigate(`/player/profile/${playerId}`);
  };

  const handleAddPlayer = () => {
    navigate("/player/add");
  };

  return (
    <div className="view-all-players-container">
      <h1>Cricket Players</h1>
      <button className="add-player-button" onClick={handleAddPlayer}>
        Add Player
      </button>

      <div className="controls-container">
        <div className="controls-group">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="role-filter"
            >
              <option value="">All Roles</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-rounder">All-rounder</option>
              <option value="Wicket-keeper">Wicket-keeper</option>
            </select>
          </div>

          <div className="sort-container">
            <span>Sort by:</span>
            <button
              className={`sort-button ${
                sortConfig.key === "name" ? "active" : ""
              }`}
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {sortConfig.key === "name" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </button>
            <button
              className={`sort-button ${
                sortConfig.key === "rating" ? "active" : ""
              }`}
              onClick={() => handleSort("rating")}
            >
              Rating{" "}
              {sortConfig.key === "rating" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="players-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Medical Status</th>
              <th>Rating</th>
              <th>Statistics</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr
                key={player.id}
                className={player.medicalStatus === "win" ? "Win" : ""}
              >
                <td>{player.name}</td>
                <td>{player.role}</td>
                <td className={`status ${player.medicalStatus.toLowerCase()}`}>
                  {player.medicalStatus}
                </td>
                <td>
                  <StarRating
                    runs={player.statistics.runs}
                    wickets={player.statistics.wickets}
                  />
                </td>
                <td>
                  <div className="stats-preview">
                    {player.role === "Batsman" ||
                    player.role === "All-rounder" ||
                    player.role === "Wicket-keeper" ? (
                      <span>Runs: {player.statistics.runs}</span>
                    ) : null}
                    {player.role === "Bowler" ||
                    player.role === "All-rounder" ? (
                      <span>Wickets: {player.statistics.wickets}</span>
                    ) : null}
                  </div>
                </td>
                <td>
                  <button
                    className="view-profile-button"
                    onClick={() => handleViewProfile(player.id)}
                  >
                    View Profile
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

export default MatchHistory; */

import "./MatchHistory.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import kandyLogo from "../assets/7.jpg";
import jaffnaLogo from "../assets/1.jpeg";
import amparaLogo from "../assets/2.png";
import kurunagalLogo from "../assets/11.jpg";
import vavuniyaLogo from "../assets/6.jpg";
import battiLogo from "../assets/5.avif";
import colomboLogo from "../assets/12.avif";

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

  //sorting according sno we can sort by name  when the use  or date
  /*const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
*/
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
