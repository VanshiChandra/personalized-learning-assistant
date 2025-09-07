import React, { useState } from 'react';
import { uploadScores } from '../services/api';

const UploadScores = ({ token }) => {
  const [scores, setScores] = useState([{ subject: '', score: '' }]);
  const [message, setMessage] = useState('');

  const handleChange = (index, field, value) => {
    const newScores = [...scores];
    newScores[index][field] = value;
    setScores(newScores);
  };

  const addRow = () => setScores([...scores, { subject: '', score: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatted = scores.map(s => ({ subject: s.subject, score: Number(s.score) }));
    try {
      await uploadScores(formatted, token);
      setMessage('Scores uploaded successfully!');
    } catch (err) {
      setMessage('Error uploading scores.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Scores</h2>
      <form onSubmit={handleSubmit}>
        {scores.map((s, i) => (
          <div key={i} style={styles.row}>
            <input placeholder="Subject" value={s.subject} onChange={e => handleChange(i, 'subject', e.target.value)} style={styles.input} />
            <input placeholder="Score" type="number" value={s.score} onChange={e => handleChange(i, 'score', e.target.value)} style={styles.input} />
          </div>
        ))}
        <button type="button" onClick={addRow} style={styles.buttonSecondary}>Add Row</button>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}