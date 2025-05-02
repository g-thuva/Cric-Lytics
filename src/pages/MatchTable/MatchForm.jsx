/*import { useState } from "react";
import axios from "axios";

const MatchForm = () => {
  const [formData, setFormData] = useState({
    matchNumber: "",
    matchTeam: "",
    result: "",
    winningScore: "",
    losingScore: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7115/api/MatchResults", formData);
      alert("Match result submitted successfully!");
    } catch (error) {
      console.error("Error submitting match result:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <h2>Add Match Result</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="matchNumber"
          placeholder="Match Number"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="matchTeam"
          placeholder="Match Team"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="result"
          placeholder="Result"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="winningScore"
          placeholder="Winning Score"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="losingScore"
          placeholder="Losing Score"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MatchForm;*/

import { useState } from "react";
import axios from "axios";
const MatchForm = () => {
  const [formData, setFormData] = useState({
    matchNumber: "",
    date: "",
    matchTeam: "",
    result: "",
    winningScore: "",
    losingScore: "",
    matchType: "",
    venue: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("https://localhost:7115/api/MatchResults", formData);
      alert("✅ Match result submitted successfully!");
      setFormData({
        matchNumber: "",
        date: "",
        matchTeam: "",
        result: "",
        winningScore: "",
        losingScore: "",
        matchType: "",
        venue: "",
      });
    } catch (error) {
      console.error("Error submitting match result:", error);
      alert("❌ Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="match-form-container"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        background: "#f8f9fa",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "blue" }}>Add Match Result</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="matchNumber"
          placeholder="Match Number"
          value={formData.matchNumber}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="matchTeam"
          placeholder="Match Team"
          value={formData.matchTeam}
          onChange={handleChange}
          required
        />

        <select
          name="result"
          value={formData.result}
          onChange={handleChange}
          required
        >
          <option value="">Select Result</option>
          <option value="Win">Win</option>
          <option value="Lose">Lose</option>
          <option value="Draw">Draw</option>
        </select>

        <input
          type="number"
          name="winningScore"
          placeholder="Winning Score"
          value={formData.winningScore}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="losingScore"
          placeholder="Losing Score"
          value={formData.losingScore}
          onChange={handleChange}
          required
        />

        <select
          name="matchType"
          value={formData.matchType}
          onChange={handleChange}
          required
        >
          <option value="">Select Match Type</option>
          <option value="T20">T20</option>
          <option value="Test">Test</option>
          <option value="ODI">ODI</option>
        </select>

        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={formData.venue}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px",
            backgroundColor: isSubmitting ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default MatchForm;
