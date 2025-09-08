import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  return (
    <nav style={{ padding: "1rem", background: "#f5f5f5", marginBottom: "1rem" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      {user ? (
        <>
          <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
          <button onClick={() => setUser(null)}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
