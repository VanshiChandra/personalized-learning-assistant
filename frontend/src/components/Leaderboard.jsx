import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/leaderboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setLeaders(data);
        } else {
          alert(data.error || "Failed to load leaderboard");
        }
      } catch (err) {
        console.error(err);
        alert("Server error. Please try again.");
      }
    };

    fetchLeaders();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaders.length > 0 ? (
        <ol>
          {leaders.map((leader, idx) => (
            <li key={idx}>
              {leader.name} - {leader.totalMarks} points
            </li>
          ))}
        </ol>
      ) : (
        <p>No leaderboard data available.</p>
      )}
    </div>
  );
};

export default Leaderboard;
