import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/header";
import Home from "./pages/home";
import About from "./pages/about";
import Profile from "./pages/profile";
import Footer from "./pages/footer";
import Contacts from "./pages/contacts";
import Add_match_data from "./pages/add_match_data";
import "./css/style.css"; 
import "./css/about.css";
import "./css/profile.css";
import "./css/contacts.css";
import "./css/add_match_data.css";

function App() {
  return (
    <Router>
      <div className="app-containerkk">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/add_match_data" element={<Add_match_data />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
