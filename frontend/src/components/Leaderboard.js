import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await getLeaderboard();
        setData(res.data); // expects array of {name, totalScore}
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboard", err);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (!data.length) return <p>No data available.</p>;

  const chartData = {
    labels: data.map((user) => user.name),
    datasets: [
      {
        label: "Total Score",
        data: data.map((user) => user.totalScore),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Leaderboard" },
    },
  };

  return (
    <div style={styles.container}>
      <h2>Leaderboard</h2>
      <Bar data={chartData} options={options} />
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {data
            .sort((a, b) => b.totalScore - a.totalScore)
            .map((user, index) => (
              <tr key={user.name}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.totalScore}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: "30px", textAlign: "center" },
  table: {
    margin: "20px auto",
    borderCollapse: "collapse",
    width: "80%",
    textAlign: "center",
  },
};

export default Leaderboard;
