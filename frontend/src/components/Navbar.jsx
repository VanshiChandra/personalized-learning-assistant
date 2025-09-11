// frontend/src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {!token && <Link to="/login">Login</Link>}
      {!token && <Link to="/signup">Signup</Link>}

      {token && <Link to="/dashboard">Dashboard</Link>}
      {token && <Link to="/upload-scores">Upload Scores</Link>}
      {token && (
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
