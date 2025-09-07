import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../services/api';
import { Bar } from 'react-chartjs-2';

export default function Dashboard({ token }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getRecommendations(token).then(res => setData(res.data));
  }, [token]);

  if (!data) return <div>Loading...</div>;

  const chartData = {
    labels: data.recommended_subjects,
    datasets: [
      {
        label: 'Weakness Level',
        data: Object.values(data.progress),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Weakest Subjects</h2>
      <Bar data={chartData} />
      <h3 className="text-xl mt-6">Study Plan</h3>
      <ul className="list-disc ml-6 mt-2">
        {Object.entries(data.study_plan).map(([sub, plan], i) => <li key={i}>{plan}</li>)}
      </ul>
    </div>
  );
}
