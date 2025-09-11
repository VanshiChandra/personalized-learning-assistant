// frontend/src/components/Leaderboard.jsx
import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/leaderboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setLeaderboard(data);
        } else {
          console.error(data.error || "Failed to fetch leaderboard");
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    if (token) {
      fetchLeaderboard();
    }
  }, [token]);

  if (!token) {
    return <p>Please log in to view the leaderboard.</p>;
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, i) => (
            <tr key={entry._id}>
              <td>{i + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
