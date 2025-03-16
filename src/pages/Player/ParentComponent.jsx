import React, { useState } from "react";
import ViewAllPlayers from "./ViewAllPlayers"; 
import AddPlayer from "./AddPlayer"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // For routing

const ParentComponent = () => {
  // State to store all players
  const [allPlayers, setAllPlayers] = useState([
    {
        id: 1,
      name: "Virat Kohli",
      role: "Batsman",
      medicalStatus: "Well",
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
    }
  ]);

  // Function to add new players to the list
  const handleAddPlayer = (newPlayer) => {
    setAllPlayers((prevPlayers) => [...prevPlayers, ...newPlayer]);
  };

  return (
    <Router>
      <Routes>
        {/* Route for ViewAllPlayers */}
        <Route
          path="/view_all_players"
          element={<ViewAllPlayers allPlayers={allPlayers} />}
        />
        {/* Route for AddPlayer */}
        <Route
          path="/add_player"
          element={<AddPlayer onAddPlayer={handleAddPlayer} />}
        />
        {/* Default route (redirect to ViewAllPlayers) */}
        <Route path="/" element={<Navigate to="/view_all_players" />} />
      </Routes>
    </Router>
  );
};

export default ParentComponent;