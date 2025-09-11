// frontend/src/components/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return (
    <div className="landing">
      <h1>Welcome to the Personalized Learning Assistant App</h1>
      <p>Upload your scores and get assistance for each subject.</p>
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
