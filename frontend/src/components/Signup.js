import React, { useState } from 'react';
import { register } from '../services/api';

const Signup = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password });
      setUser({ ...res.data.user, token: res.data.token });
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} style={styles.input} />
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} style={styles.input} />
        <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={styles.input} />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px' },
  form: { display: 'flex', flexDirection: 'column', width: '300px' },
  input: { marginBottom: '15px', padding: '10px', fontSize: '16px' },
  button: { padding: '10px', fontSize: '16px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px' },
  error: { color: 'red', marginBottom: '10px' }
};

export default Signup;
