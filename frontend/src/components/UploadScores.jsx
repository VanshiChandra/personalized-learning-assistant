// frontend/src/components/UploadScores.jsx
import React, { useState } from "react";
import axios from "axios";

const UploadScores = () => {
  const [scores, setScores] = useState([{ subject: "", marks: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...scores];
    updated[index][field] = value;
    setScores(updated);
  };

  const addRow = () => setScores([...scores, { subject: "", marks: "" }]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/scores/upload`,
        { scores },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Scores uploaded successfully!");
    } catch (err) {
      console.error("Error uploading scores:", err);
      alert("Failed to upload scores");
    }
  };

  return (
    <div>
      <h2>Upload Scores</h2>
      {scores.map((score, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Subject"
            value={score.subject}
            onChange={(e) => handleChange(index, "subject", e.target.value)}
          />
          <input
            type="number"
            placeholder="Marks"
            value={score.marks}
            onChange={(e) => handleChange(index, "marks", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addRow}>Add Row</button>
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default UploadScores;
