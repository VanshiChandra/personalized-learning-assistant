import React, { useState } from "react";
import api from "../services/api";

function UploadScores({ refreshScores }) {
  const [scores, setScores] = useState([{ subject: "", score: "" }]);

  const handleChange = (index, field, value) => {
    const newScores = [...scores];
    newScores[index][field] = value;
    setScores(newScores);
  };

  const addRow = () => setScores([...scores, { subject: "", score: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/scores/upload",
        { scores },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Scores uploaded!");
      refreshScores();
    } catch (err) {
      alert("Error uploading scores");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Upload Scores</h3>
      {scores.map((s, i) => (
        <div key={i}>
          <input
            placeholder="Subject"
            value={s.subject}
            onChange={(e) => handleChange(i, "subject", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Score"
            value={s.score}
            onChange={(e) => handleChange(i, "score", e.target.value)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addRow}>
        + Add Row
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UploadScores;
