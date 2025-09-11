// frontend/src/components/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return (
    <div className="landing">
      <h1>Welcome to the Student Performance App</h1>
      <p>Track scores, compete on the leaderboard, and manage your progress.</p>
      {token && user ? (
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      ) : (
        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")} style={{ marginLeft: "1rem" }}>
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default Landing;
