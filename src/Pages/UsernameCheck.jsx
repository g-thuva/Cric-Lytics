import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UsernameCheck.css";
import axios from "axios"; // Import Axios

const UsernameCheck = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const navigate = useNavigate();

  const handleNext = async (e) => {
    e.preventDefault();

    // Check if username is provided
    if (username.trim() === "") {
      alert("Please enter your username.");
      return;
    }

    try {
      // Make the API request to check the username
      const response = await axios.post("http://localhost:5015/api/auth/username-check", { username });
      
      if (response.data.exists) {
        await axios.post("http://localhost:5015/api/auth/send-otp", { username });
        const userData = {
          username: username,
          email: response.data.email, // Assuming the API provides email
        };
        navigate("/verify", { state: userData });
      } else {
        setErrorMessage("Username does not exist.");
      }
    } catch (error) {
      // Handle errors (e.g., server down, unexpected issues)
      setErrorMessage("An error occurred while checking the username.");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="username-container">
      <div className="background-wrapper">
        <div className="background-image"></div>
      </div>
      <div className="username-box">
        <h2>Verification</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Show error message */}

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="button-group">
          <button onClick={handleBack} className="back-button">Back</button>
          <button onClick={handleNext} className="next-button">Send OTP</button>
        </div>
      </div>
    </div>
  );
};

export default UsernameCheck;
