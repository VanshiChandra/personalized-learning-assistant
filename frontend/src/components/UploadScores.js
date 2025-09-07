import React, { useState } from "react";

export default function UploadScores({ user }) {
  const [scores, setScores] = useState([{ subject: "", score: "" }]);

  const handleChange = (index, field, value) => {
    const newScores = [...scores];
    newScores[index][field] = value;
    setScores(newScores);
  };

  const handleAdd = () => setScores([...scores, { subject: "", score: "" }]);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/scores/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ scores })
    });
    const data = await res.json();
    alert(data.message || "Uploaded successfully");
  };

  return (
    <div className="container">
      <h2>Upload Scores</h2>
      <form onSubmit={handleSubmit}>
        {scores.map((s, i) => (
          <div key={i}>
            <input placeholder="Subject" value={s.subject} onChange={e => handleChange(i, "subject", e.target.value)} required />
            <input placeholder="Score" type="number" value={s.score} onChange={e => handleChange(i, "score", e.target.value)} required />
          </div>
        ))}
        <button type="button" onClick={handleAdd}>Add Subject</button>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
