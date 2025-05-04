/*import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/Notification.css";

const Notification = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [readIds, setReadIds] = useState([]); // Track the IDs of the clicked rows
  const navigate = useNavigate();

  // Load readIds from localStorage on mount to persist clicked rows
  useEffect(() => {
    const storedReadIds = localStorage.getItem("readMedicalIds");
    if (storedReadIds) {
      setReadIds(JSON.parse(storedReadIds)); // Set readIds from localStorage
    }
  }, []);

  // Save readIds to localStorage whenever they change (this ensures persistence across refreshes)
  useEffect(() => {
    if (readIds.length > 0) {
      localStorage.setItem("readMedicalIds", JSON.stringify(readIds));
    }
  }, [readIds]);

  // Fetch the submissions from the API
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5121/api/MedicalForm"
        );
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  // Handle row click to mark the submission as read
  const handleSubmissionClick = (submission) => {
    // Update the readIds to include the clicked submission's ID
    if (!readIds.includes(submission.id)) {
      setReadIds((prev) => [...prev, submission.id]);
    }
    navigate(`/medical-details/${submission.id}`, { state: { submission } });
  };

  // Filter and search submissions based on player name
  const filteredSubmissions = submissions.filter((sub) =>
    sub.playerName?.toLowerCase().includes(searchName.toLowerCase())
  );

  // Format the submission date
  const formatDateTime = (datetime) => {
    if (!datetime) return "N/A";
    const date = new Date(datetime);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="admin-page">
      <h2>Notifications</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by Player Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Player Name</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((submission) => {
              const isRead = readIds.includes(submission.id); // Check if the row is clicked (read)
              return (
                <tr
                  key={submission.id}
                  className={isRead ? "read-row" : ""} // Apply "read-row" class for clicked rows
                  onClick={() => handleSubmissionClick(submission)} // Mark the row as read on click
                >
                  <td>{formatDateTime(submission.dateSubmitted)}</td>
                  <td>{submission.playerName || "N/A"}</td>
                  <td>{submission.messageType || "Medical"}</td>{" "}
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notification; */

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/Notification.css";

const MedicalNotification = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [readIds, setReadIds] = useState([]); // Track the IDs of the clicked rows
  const [sortOrder, setSortOrder] = useState("desc"); // Default to descending sort by date
  const navigate = useNavigate();

  // Load readIds from localStorage on mount to persist clicked rows
  useEffect(() => {
    const storedReadIds = localStorage.getItem("readMedicalIds");
    if (storedReadIds) {
      setReadIds(JSON.parse(storedReadIds)); // Set readIds from localStorage
    }
  }, []);

  // Save readIds to localStorage whenever they change (this ensures persistence across refreshes)
  useEffect(() => {
    if (readIds.length > 0) {
      localStorage.setItem("readMedicalIds", JSON.stringify(readIds));
    }
  }, [readIds]);

  // Fetch the submissions from the API
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5121/api/MedicalForm"
        );
        console.log("Fetched Submissions:", response.data); // Debugging: Check the data
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  // Handle row click to mark the submission as read
  const handleSubmissionClick = (submission) => {
    if (!readIds.includes(submission.id)) {
      setReadIds((prev) => [...prev, submission.id]);
    }
    navigate(`/medical-details/${submission.id}`, { state: { submission } });
  };

  // Handle search filter by Player Name or Player ID
  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.playerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.playerId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format the submission date
  const formatDateTime = (datetime) => {
    if (!datetime) return "N/A";
    const date = new Date(datetime);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Sort submissions by date (ascending or descending)
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    const dateA = new Date(a.dateSubmitted);
    const dateB = new Date(b.dateSubmitted);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="admin-page">
      <h2>Notifications</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by Player Name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={toggleSortOrder}>
          Sort by Date {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Player ID</th>
              <th>Player Name</th>
            </tr>
          </thead>
          <tbody>
            {sortedSubmissions.length > 0 ? (
              sortedSubmissions.map((submission) => {
                const isRead = readIds.includes(submission.id); // Check if the row is clicked (read)
                return (
                  <tr
                    key={submission.id}
                    className={isRead ? "read-row" : ""} // Apply "read-row" class for clicked rows
                    onClick={() => handleSubmissionClick(submission)} // Mark the row as read on click
                  >
                    <td>{formatDateTime(submission.dateSubmitted)}</td>
                    <td>{submission.playerId || "N/A"}</td> {/* Player ID */}
                    <td>{submission.playerName || "N/A"}</td>{" "}
                    {/* Player Name */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3">No submissions available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalNotification;
