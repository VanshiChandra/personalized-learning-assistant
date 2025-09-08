import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [topStudents, setTopStudents] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch("http://localhost:5000/leaderboard");
      const data = await res.json();
      setTopStudents(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Average Score</th>
          </tr>
        </thead>
        <tbody>
          {topStudents.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.avgScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
