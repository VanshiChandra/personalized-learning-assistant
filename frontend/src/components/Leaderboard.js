import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/api';

export default function Leaderboard() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    getLeaderboard().then(res => setBoard(res.data));
  }, []);

  return (
    <div>
      <h3>Leaderboard</h3>
      <ol>
        {board.map((user, i) => <li key={i}>{user.name}: {user.totalScore}</li>)}
      </ol>
    </div>
  );
}
