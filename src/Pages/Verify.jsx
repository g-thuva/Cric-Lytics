import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";  // Import Axios for API requests
import "../css/Verify.css";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error message
  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {}; // Get the username

  

  // Handle OTP submission (verify OTP)
  const handleNext = async () => {
    if (otp.trim() === "") {
      alert("Please enter the OTP.");
      return;
    }
  
    if (!username) {
      setErrorMessage("Username is missing.");
      return;
    }
  
    const payload = { otp, username };
    console.log("Payload for verification:", payload);
  
    try {
      const response = await axios.post("http://localhost:5015/api/auth/verify-otp", payload);
      console.log("Verify OTP response:", response.data);
  
      if (
        response.data.message ===
        "OTP verified successfully. You can now reset your password."
      ) {
        navigate("/reset-password", { state: { username } });
      } else {
        setErrorMessage(response?.data?.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred during OTP verification.");
    }
  };
  

  // Handle OTP resend
  const handleResendOtp = async () => {
    if (!username) {
      setErrorMessage("Username is missing.");
      return;
    }
    console.log("Resend OTP request for username:", username); 
    try {
      const response = await axios.post(
        "http://localhost:5015/api/auth/resend-otp",
        { username } // Send username for OTP resend
      );
      console.log("Resend OTP response:", response);

      if (response.status === 200) {
        alert(response.data.message || "OTP has been resent!");
      } else {
        setErrorMessage("Failed to resend OTP.");
      }
      
    } catch (error) {
      setErrorMessage("An error occurred while resending OTP.");
    }
  };

  const handleBack = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="verify-container">
      <div className="background-wrapper">
        <div className="background-image"></div>
      </div>
      <div className="verify-box">
        <h2>OTP Verification</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <div className="button-group-otp">
          <button onClick={handleResendOtp} className="resend-button">Resend OTP</button>
        </div>
        <div className="button-group">
          <button onClick={handleBack} className="back-button">Back</button>
          <button onClick={handleNext} className="next-button">Verify</button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
