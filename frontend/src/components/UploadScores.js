import React, { useState } from "react";
import { uploadScores } from "../services/api.js";

export default function UploadScores({ userId }) {
  const [scores, setScores] = useState([{ subject: "", score: 0 }]);

  const handleChange = (i, field, value) => {
    const temp = [...scores];
    temp[i][field] = field === "score" ? Number(value) : value;
    setScores(temp);
  };

  const handleAdd = () => setScores([...scores, { subject: "", score: 0 }]);

  const handleSubmit = async e => {
    e.preventDefault();
    await uploadScores(scores);
    alert("Scores uploaded!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Scores</h2>
      {scores.map((s, i) => (
        <div key={i}>
          <input type="text" placeholder="Subject" value={s.subject} onChange={e => handleChange(i, "subject", e.target.value)} required />
          <input type="number" placeholder="Score" value={s.score} onChange={e => handleChange(i, "score", e.target.value)} required />
        </div>
      ))}
      <button type="button" onClick={handleAdd}>Add Subject</button>
      <button type="submit">Upload</button>
    </form>
  );
}
