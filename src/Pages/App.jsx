import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Log from "./Log";
import Dashboard from './Dashboard';
import UsernameCheck from "./UsernameCheck";
import Verify from "./Verify";
import ResetPassword from "./ResetPassword";
import SignIn from "./Signin";  // Import the SignIn page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Log />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />  {/* Add SignIn route */}
        <Route path="/forgot-password" element={<UsernameCheck />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
