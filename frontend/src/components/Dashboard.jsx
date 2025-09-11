// frontend/src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {user ? (
        <p>Welcome, {user.name} ({user.email})</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

export default Dashboard;
