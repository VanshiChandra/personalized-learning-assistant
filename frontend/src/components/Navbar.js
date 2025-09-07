import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>PLA</Link>
      <div>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/signup" style={styles.link}>Sign Up</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 50px', backgroundColor: '#333', color: 'white' },
  logo: { color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '24px' },
  link: { marginLeft: '20px', color: 'white', textDecoration: 'none', fontSize: '16px' }
};

export default Navbar;
