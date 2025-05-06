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
import OurPlayers from "./pages/OurPlayers";
import MatchHistory from "./pages/MatchTable/MatchHistory";
import ScoreCard from "./pages/MatchTable/ScoreCard";
import UpcomingMatches from "./pages/MatchTable/UpcomingMatches";
import AddNews from "./pages/NewsUpdates/AddNews";
import MedicalForm from "./pages/Medical/MedicalForm";
import MedicalNotification from "./pages/Notifications/MedicalNotification";
import ViewMedicalDetails from "./pages/Notifications/ViewMedicalDetails";

import AllNotification from "./pages/Notifications/AllNotification";
/*

/*


import MatchForm from "./pages/MatchTable/MatchForm";
import MatchResults from "./pages/MatchTable/MatchFormResults";

import "./App.css";*/

import { ThemeProvider } from "./pages/ThemeContext"; // ✅ IMPORT HERE

import "./css/style.css";
import "./css/about.css";
import "./css/profile.css";
import "./css/contacts.css";
import "./css/add_match_data.css";

function App() {
  return (
    <ThemeProvider>
      {" "}
      {/* ✅ WRAP WHOLE APP */}
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

            <Route path="/OppositeTeam/:matchCode" element={<OppositeTeam />} />
            <Route path="/match-history" element={<MatchHistory />} />
            <Route path="/scorecard/:matchId" element={<ScoreCard />} />
            <Route path="/upcoming-matches" element={<UpcomingMatches />} />
            <Route path="/addnews-form" element={<AddNews />} />
            <Route path="/medical-form" element={<MedicalForm />} />
            <Route path="/admin-medical" element={<MedicalNotification />} />
            <Route path="/all-notification" element={<AllNotification />} />
            <Route path="/our-players/:matchCode" element={<OurPlayers />} />
            <Route
              path="/medical-details/:id"
              element={<ViewMedicalDetails />}
            />

            {/*

            <Route path="/match-results" element={<MatchResults />} />
            <Route path="/match-form" element={<MatchForm />} />*/}
          </Routes>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
