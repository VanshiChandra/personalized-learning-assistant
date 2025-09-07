import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/upload">Upload Scores</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <button onClick={() => setUser(null)}>Logout</button>
        </>
      )}
    </nav>
  );
}
