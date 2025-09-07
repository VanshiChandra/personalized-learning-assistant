import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../services/api';

const Dashboard = ({ token }) => {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRecommendations(token);
      setRecommendations(res.data);
    };
    fetchData();
  }, [token]);

  if (!recommendations) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>Recommended Subjects</h2>
      <ul>
        {recommendations.recommended_subjects.map(sub => (
          <li key={sub}>
            <strong>{sub}</strong>: {recommendations.study_plan[sub]}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = { container: { padding: '20px' } };
export default Dashboard;
