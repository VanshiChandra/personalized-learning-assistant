import React, { useState } from 'react';
import { api } from '../services/api';

const UploadScores = ({ userId }) => {
  const [scores, setScores] = useState([{ subject: '', score: '' }]);

  const handleChange = (index, field, value) => {
    const newScores = [...scores];
    newScores[index][field] = value;
    setScores(newScores);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await api.post('/records/upload', { scores }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Scores uploaded successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Scores</h2>
      {scores.map((s, i) => (
        <div key={i}>
          <input type="text" placeholder="Subject" value={s.subject} onChange={e=>handleChange(i,'subject',e.target.value)} required />
          <input type="number" placeholder="Score" value={s.score} onChange={e=>handleChange(i,'score',e.target.value)} required />
        </div>
      ))}
      <button type="button" onClick={()=>setScores([...scores, { subject: '', score: '' }])}>Add Another</button>
      <br /><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UploadScores;
