import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clear token
    navigate("/"); // ✅ Redirect to landing page
  };

  return (
    <nav>
      <h2>Student Performance App</h2>
      <div>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/upload-scores">Upload Scores</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
