import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/Notification.css";

const Notification = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [readIds, setReadIds] = useState([]); // Track the IDs of the clicked rows
  const navigate = useNavigate();
  const [messageFilter, setMessageFilter] = useState("All");

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
  const filteredSubmissions = submissions
    .filter((sub) =>
      sub.playerName?.toLowerCase().includes(searchName.toLowerCase())
    )
    .filter((sub) => {
      if (messageFilter === "All") return true;
      const messageType = sub.messageType || "Medical"; // Default to Medical if null
      return messageType === messageFilter;
    });

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
        <select
          value={messageFilter}
          onChange={(e) => setMessageFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="Medical">Medical</option>
          <option value="Request">Request</option>
        </select>
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
                  {/* Display the Message column */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notification;
