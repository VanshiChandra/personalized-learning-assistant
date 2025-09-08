import React, { useEffect, useState } from "react";
import UploadScores from "./UploadScores";
import Leaderboard from "./Leaderboard";
import api from "../services/api";

function Dashboard({ user }) {
  const [scores, setScores] = useState([]);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/scores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScores(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScores();
  }, [user]);

  const getRecommendations = async () => {
    try {
      const res = await api.post("/ml/recommend", { scores });
      setRecommendations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p>Please log in first.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {user.name}</h2>
      <UploadScores refreshScores={() => window.location.reload()} />
      <Leaderboard />
      <button onClick={getRecommendations} style={{ marginTop: "1rem" }}>
        Get Study Recommendations
      </button>
      {recommendations && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Recommended Subjects:</h3>
          <ul>
            {recommendations.recommended_subjects.map((sub) => (
              <li key={sub}>{sub}</li>
            ))}
          </ul>
          <h3>Study Plan:</h3>
          <pre>{JSON.stringify(recommendations.study_plan, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
