import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import UploadScores from "./components/UploadScores";
import Leaderboard from "./components/Leaderboard";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        {user && (
          <>
            <Route path="/dashboard" element={<Dashboard token={user.token} />} />
            <Route path="/upload" element={<UploadScores token={user.token} />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
