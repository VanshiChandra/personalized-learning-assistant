import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Personalized Learning Assistant</h1>
    <p>Upload past scores, get AI recommendations, track progress, compare on leaderboard.</p>
    <Link to="/login"><button style={{ marginRight: '10px' }}>Login</button></Link>
    <Link to="/signup"><button>Register</button></Link>
  </div>
);

export default LandingPage;
