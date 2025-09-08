import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <h1>Welcome to Student Performance App</h1>
      <p>Track, analyze, and improve student performance with ease.</p>
      <Link to="/signup">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default Landing;
