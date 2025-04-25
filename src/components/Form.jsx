import { useState } from "react";

const MatchForm = () => {
  const [matchNumber, setMatchNumber] = useState("");
  const [matchTeam, setMatchTeam] = useState("");
  const [result, setResult] = useState("");
  const [winningScore, setWinningScore] = useState("");
  const [losingScore, setLosingScore] = useState("");

  const handleCheckboxChange = (value) => {
    setResult((prev) => (prev === value ? "" : value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      matchNumber,
      matchTeam,
      result,
      winningScore,
      losingScore,
    };
    console.log("Submitted data:", formData);
    // You can now POST this data to your .NET backend using fetch or axios
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto shadow-lg rounded-xl bg-white"
    >
      <h2 className="text-xl font-bold mb-4">Match Result Form</h2>

      <label className="block mb-2">
        Match Number:
        <input
          type="text"
          value={matchNumber}
          onChange={(e) => setMatchNumber(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Match Team:
        <input
          type="text"
          value={matchTeam}
          onChange={(e) => setMatchTeam(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <div className="mb-2">
        <p>Result:</p>
        <label className="inline-flex items-center mr-4">
          <input
            type="checkbox"
            checked={result === "win"}
            onChange={() => handleCheckboxChange("win")}
          />
          <span className="ml-2">Win</span>
        </label>
        <label className="inline-flex items-center mr-4">
          <input
            type="checkbox"
            checked={result === "loss"}
            onChange={() => handleCheckboxChange("loss")}
          />
          <span className="ml-2">Loss</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={result === "tie"}
            onChange={() => handleCheckboxChange("tie")}
          />
          <span className="ml-2">Tie</span>
        </label>
      </div>

      <label className="block mb-2">
        Winning Score:
        <input
          type="number"
          value={winningScore}
          onChange={(e) => setWinningScore(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        Losing Score:
        <input
          type="number"
          value={losingScore}
          onChange={(e) => setLosingScore(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default MatchForm;
