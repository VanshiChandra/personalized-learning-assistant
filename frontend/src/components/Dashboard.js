import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = ({ userId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await api.get('/records/chart-data', { headers: { Authorization: `Bearer ${token}` } });
      const labels = res.data.map(item => item.subject);
      const scores = res.data.map(item => item.score);
      setChartData({ labels, datasets: [{ label: 'Scores', data: scores, borderColor: 'blue', tension: 0.4 }] });
    };
    fetchData();
  }, [userId]);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Progress</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Dashboard;
