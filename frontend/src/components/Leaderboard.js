import React, { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const res = await fetch("http://localhost:5000/leaderboard");
      const data = await res.json();
      setLeaders(data);
    };
    fetchLeaders();
  }, []);

  return (
    <div className="container">
      <h2>Leaderboard</h2>
      <ul>
        {leaders.map((l, i) => (
          <li key={i}>{l.name}: {l.totalScore}</li>
        ))}
      </ul>
    </div>
  );
}
