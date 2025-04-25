import { useState } from "react";
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

export default MatchForm;
