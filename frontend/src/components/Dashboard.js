import React, { useEffect, useState } from "react";
import { getProgress } from "../services/api.js";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ userId }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getProgress().then(setScores);
  }, []);

  const data = {
    labels: scores.map(s => s.subject),
    datasets: [
      {
        label: "Score",
        data: scores.map(s => s.score),
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  return (
    <div>
      <h2>Your Progress</h2>
      <Bar data={data} />
    </div>
  );
}
