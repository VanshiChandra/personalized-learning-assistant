import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../services/api.js";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getLeaderboard().then(setLeaders);
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaders.map((l, i) => (
          <li key={i}>{l.name}: {l.totalScore}</li>
        ))}
      </ul>
    </div>
  );
}
