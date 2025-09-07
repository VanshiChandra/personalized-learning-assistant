import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Personalized Learning Assistant</h1>
        <p>Upload your scores and get AI-driven study plans, recommendations, and track your progress!</p>
        <div style={styles.buttons}>
          <Link to="/login" style={styles.button}>Login</Link>
          <Link to="/signup" style={styles.buttonSecondary}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { fontFamily: 'Arial, sans-serif', textAlign: 'center' },
  hero: { padding: '100px 20px', backgroundColor: '#f5f5f5' },
  buttons: { marginTop: '20px' },
  button: { margin: '0 10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '5px' },
  buttonSecondary: { margin: '0 10px', padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', textDecoration: 'none', borderRadius: '5px' },
};

export default LandingPage;
