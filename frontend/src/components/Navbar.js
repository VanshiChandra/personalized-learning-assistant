import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  return (
    <div className="navbar">
      <div><Link to="/">PLA</Link></div>
      <div>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/upload">Upload Scores</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <button onClick={() => setUser(null)}>Logout</button>
          </>
        ) : null}
      </div>
    </div>
  );
}
