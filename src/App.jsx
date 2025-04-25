import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MatchHistory from "./components/MatchHistory";
import ScoreCard from "./components/ScoreCard";
import UpcomingMatches from "./components/UpcomingMatches";
import MedicalForm from "./components/MedicalForm";
import AddNews from "./components/AddNews";
import MatchForm from "./components/MatchForm";
import MatchResults from "./components/MatchResults";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/scorecard/:matchId" element={<ScoreCard />} />
        <Route path="/upcoming-matches" element={<UpcomingMatches />} />
        <Route path="/match-history" element={<MatchHistory />} />
        <Route path="/addnews-form" element={<AddNews />} />
        <Route path="/medical-form" element={<MedicalForm />} />

        <Route path="/match-results" element={<MatchResults />} />
        <Route path="/match-form" element={<MatchForm />} />
      </Routes>
    </Router>
  );
};

export default App;
