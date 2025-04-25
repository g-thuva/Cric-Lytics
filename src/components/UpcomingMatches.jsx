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

const UpcomingMatches = () => {
  const [match, setMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // serching
  const [typeFilter, setTypeFilter] = useState(""); // type

  const [venuFilter, setVenuFilter] = useState(""); // venu
  /*const [sortConfig, setSortConfig] = useState({
    key: "sno", // sort by serialnum
    direction: "ascending",
  });*/

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
        team: "kurunagal cric",
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
        team: "vavuniya cric",
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

    return matchesSearch && matchesType && matchesVenu;
  });
  //.sort((a, b) => a.sno - b.sno); // Sort by match number (sno)

  const handleAddMatches = () => {
    navigate("/player/add");
  };
  const handleMatchHistory = () => {
    navigate("/match-history");
  };

  return (
    <div className="upcoming-matches-container">
      <h1>Upcoming Matches</h1>
      <div className="btn-container">
        <button className="match-history-btn" onClick={handleMatchHistory}>
          Match History
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

              <th>Type</th>
              <th>Venu</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map((match) => (
              <tr key={match.id}>
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

                <td>{match.type}</td>
                <td>{match.venu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingMatches;
