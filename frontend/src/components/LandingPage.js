import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <h1>Welcome to Personalized Learning Assistant</h1>
      <p>Upload your test scores and get AI-driven study plans!</p>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/signup")}>Signup</button>
    </div>
  );
}
