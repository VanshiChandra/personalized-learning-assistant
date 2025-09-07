import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const res = await api.get('/records/leaderboard');
      setLeaders(res.data);
    };
    fetchLeaders();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <table border="1" cellPadding="5" style={{ margin: 'auto' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((l, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{l.name}</td>
              <td>{l.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
