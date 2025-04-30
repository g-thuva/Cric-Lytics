import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/header";
import Home from "./pages/home";
import About from "./pages/about";
import Profile from "./pages/profile";
import Footer from "./pages/footer";
import Contacts from "./pages/contacts";
import Sponsorship_data from "./pages/sponsorship_data";
import Add_socialmedia from "./pages/add_socialmedia";
import OurTeam from "./pages/OurTeam"; 
import OppositeTeam from "./pages/OppositeTeam"; 

import { ThemeProvider } from "./pages/ThemeContext"; // ✅ IMPORT HERE

import "./css/style.css"; 
import "./css/about.css";
import "./css/profile.css";
import "./css/contacts.css";
import "./css/add_match_data.css";

function App() {
  return (
    <ThemeProvider> {/* ✅ WRAP WHOLE APP */}
      <Router>
        <div className="app-containerkk">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/sponsorship_data" element={<Sponsorship_data />} />
            <Route path="/add_socialmedia" element={<Add_socialmedia />} />
            <Route path="/OurTeam" element={<OurTeam />} />
            <Route path="/OppositeTeam" element={<OppositeTeam />} />

          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
