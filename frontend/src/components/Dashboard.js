import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function Dashboard({ user }) {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/records/chart-data", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result) {
        setData({
          labels: result.map(r => r.subject),
          datasets: [{ label: "Scores", data: result.map(r => r.score), backgroundColor: "blue" }]
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <Bar data={data} />
    </div>
  );
}
