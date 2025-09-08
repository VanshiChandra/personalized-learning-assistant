import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/scores`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setScores(data);
        } else {
          alert(data.error || "Failed to load scores");
        }
      } catch (err) {
        console.error(err);
        alert("Server error. Please try again.");
      }
    };

    fetchScores();
  }, []);

  return (
    <div>
      <h2>My Dashboard</h2>
      {scores.length > 0 ? (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, idx) => (
              <tr key={idx}>
                <td>{score.subject}</td>
                <td>{score.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No scores uploaded yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
