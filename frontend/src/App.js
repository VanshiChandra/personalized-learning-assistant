import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import Navbar from "./components/Navbar.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Dashboard from "./components/Dashboard.js";
import UploadScores from "./components/UploadScores.js";
import Leaderboard from "./components/Leaderboard.js";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard userId={user.id} /> : <Login setUser={setUser} />} />
        <Route path="/upload" element={user ? <UploadScores userId={user.id} /> : <Login setUser={setUser} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
