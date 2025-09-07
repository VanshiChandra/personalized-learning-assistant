import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>Welcome to Personalized Learning Assistant</h1>
      <p style={{ textAlign: "center" }}>AI-powered personalized study plans and progress tracking</p>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/signup")}>Signup</button>
    </div>
  );
}
