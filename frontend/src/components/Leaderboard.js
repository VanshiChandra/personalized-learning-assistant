import React, { useEffect, useState } from "react";
import api from "../services/api";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await api.get("/leaderboard");
        setLeaders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div>
      <h3>Leaderboard</h3>
      <ul>
        {leaders.map((u, i) => (
          <li key={i}>
            {u.name} - {u.totalScore}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
