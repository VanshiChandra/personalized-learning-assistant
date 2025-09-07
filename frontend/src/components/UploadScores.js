import React, { useState } from 'react';
import { uploadScores } from '../services/api';

export default function UploadScores({ userId }) {
  const [scores, setScores] = useState([{ subject: '', score: '' }]);

  const handleChange = (index, field, value) => {
    const newScores = [...scores];
    newScores[index][field] = value;
    setScores(newScores);
  };

  const addRow = () => setScores([...scores, { subject: '', score: '' }]);
  const handleUpload = async () => {
    const formatted = scores.map(s => ({ subject: s.subject, score: Number(s.score) }));
    await uploadScores(userId, formatted);
    alert("Scores uploaded!");
  };

  return (
    <div>
      <h3>Upload Scores</h3>
      {scores.map((s, i) => (
        <div key={i}>
          <input placeholder="Subject" value={s.subject} onChange={e => handleChange(i, 'subject', e.target.value)} />
          <input placeholder="Score" value={s.score} type="number" onChange={e => handleChange(i, 'score', e.target.value)} />
        </div>
      ))}
      <button onClick={addRow}>Add Subject</button>
      <button onClick={handleUpload}>Upload Scores</button>
    </div>
  );
}
