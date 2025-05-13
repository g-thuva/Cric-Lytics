import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import Axios
import "../css/Log.css";

const Log = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState(""); // State for username
    const [password, setPassword] = useState(""); // State for password
    const navigate = useNavigate(); // Initialize navigate

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        // User credentials
        const credentials = {
            username: username,
            password: password,
        };

        try {
            // Sending login request to the backend using Axios
            const response = await axios.post("http://localhost:5015/api/auth/login", credentials, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // If successful, get the JWT token
            const token = response.data.token;

            // Save the JWT token to localStorage (or sessionStorage)
            localStorage.setItem("jwtToken", token);

            // Redirect to the dashboard or another page
            navigate("/dashboard");
        } catch (error) {
            console.error("Error:", error);
            alert("Login failed: " + (error.response?.data || error.message)); // Show an error message
        }
    };

    return (
        <div className="login-container">
            <div className="background-wrapper">
                <div className="background-image"></div>
            </div>
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Handle username input
                    />

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Handle password input
                        />
                        <span className="icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <Eye /> : <EyeOff />}
                        </span>
                    </div>

                    <button type="submit">Login</button>
                </form>
                <a
                    href="#"
                    className="forgot-link"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/forgot-password");
                    }}
                >
                    Forgot Password?
                </a>
            </div>
        </div>
    );
};

export default Log;
