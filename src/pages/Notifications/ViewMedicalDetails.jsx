import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../css/ViewMedicalDetails.css"; // Make sure you import your style

const ViewMedicalDetails = () => {
  const { state } = useLocation();
  const { submission } = state;

  const handleDownload = () => {
    const pdfUrl = `http://localhost:5121/api/MedicalForm/download/${submission.id}`;
    window.open(pdfUrl, "_blank");
  };

  const handleReplay = () => {
    alert(`Reply to ${submission.userName}`);
  };

  const handleAddToCRT = async () => {
    try {
      await axios.post(
        `http://localhost:5121/api/MedicalForm/addToCrt/${submission.id}`
      );
      alert("Added to CRT successfully!");
    } catch (error) {
      console.error("Error adding to CRT:", error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(
        `https://localhost:5121/api/MedicalForm/reject/${submission.id}`
      );
      alert("Submission rejected.");
    } catch (error) {
      console.error("Error rejecting submission:", error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Medical Details</h2>

      <div className="medical-details-container">
        <div className="medical-detail">
          <strong>User Name:</strong> {submission.playerName}
        </div>
        <div className="medical-detail">
          <strong>Player Id:</strong> {submission.playerId}
        </div>
        <div className="medical-detail">
          <strong>Details:</strong> {submission.details}
        </div>

        <div className="button-group">
          <button className="action-btn" onClick={handleReplay}>
            Reply
          </button>
          <button className="action-btn" onClick={handleAddToCRT}>
            AddToCard
          </button>
          <button className="action-btn" onClick={handleReject}>
            Reject
          </button>
          <button className="action-btn" onClick={handleDownload}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMedicalDetails;
