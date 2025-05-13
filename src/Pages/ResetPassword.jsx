import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../css/ResetPassword.css";
import axios from 'axios';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setErrorMessage("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5015/api/auth/reset-password", {
                username: username,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            });

            if (response.data.success) {
                console.log("Password reset successful!");
                navigate("/login");
            } else {
                setErrorMessage("Password reset failed. Try again.");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            setErrorMessage(error.response?.data || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="reset-container">
            <div className="background-wrapper">
                <div className="background-image"></div>
            </div>
            <div className="reset-box">
                <h2>Reset Password</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="password-wrapper">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span className="icon" onClick={toggleNewPasswordVisibility}>
                        {showNewPassword ? <Eye /> : <EyeOff />}
                    </span>
                </div>
                <div className="password-wrapper">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="icon" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? <Eye /> : <EyeOff />}
                    </span>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default ResetPassword;
