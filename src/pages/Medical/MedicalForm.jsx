import { useState } from "react";
import axios from "axios";

const MedicalForm = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [details, setDetails] = useState("");
  const [pdf, setPdf] = useState(null);

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("PlayerName", playerName);
    formData.append("PlayerId", playerId);
    formData.append("Details", details);
    formData.append("Pdf", pdf);

    try {
      const response = await axios.post(
        "https://localhost:7115/api/MedicalForm",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form.");
    }
  };

  return (
    <div className="medical-form">
      <div className="medical-container">
        <h2>Medical Submission</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="playername">Player Name:</label>
            <input
              type="text"
              id="playername"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="playerid">Player Id:</label>
            <input
              type="text"
              id="playerid"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="details">Additional Details (Optional):</label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="pdf">Upload Medical PDF:</label>
            <input
              type="file"
              id="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={() => window.location.reload()}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalForm;
// Make sure you are using export default here
