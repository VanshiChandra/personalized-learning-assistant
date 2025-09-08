import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🎓 Personalized Learning Assistant</h1>
      <p>Track your scores, get recommendations, and improve your learning!</p>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/login">
          <button style={{ marginRight: "1rem" }}>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
