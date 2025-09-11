// frontend/src/components/UploadScores.jsx
import React, { useState, useEffect } from "react";

const UploadScores = () => {
  const [scores, setScores] = useState([{ subject: "", marks: "" }]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (index, field, value) => {
    const newScores = [...scores];
    newScores[index][field] = value;
    setScores(newScores);
  };

  const addRow = () => {
    setScores([...scores, { subject: "", marks: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/scores/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ scores }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Scores uploaded successfully!");
      } else {
        alert(data.error || "Failed to upload scores");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Scores</h2>
      {user && <p>User: {user.name}</p>}
      {scores.map((score, i) => (
        <div key={i}>
          <input
            type="text"
            placeholder="Subject"
            value={score.subject}
            onChange={(e) => handleChange(i, "subject", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Marks"
            value={score.marks}
            onChange={(e) => handleChange(i, "marks", e.target.value)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addRow}>
        Add Subject
      </button>
      <button type="submit">Submit Scores</button>
    </form>
  );
};

export default UploadScores;
