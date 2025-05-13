import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("jwtToken");
        navigate("/");
    };

    return (
        <div>
            <h1>Welcome to the Admin Dashboard</h1>
            <button onClick={logout}>Log Out</button>
        </div>
    );
};

export default Dashboard;
