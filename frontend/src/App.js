import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import UploadScores from './components/UploadScores';
import Leaderboard from './components/Leaderboard';

function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login setUser={setUser} />;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <UploadScores userId={user.userId} />
      <Dashboard userId={user.userId} />
      <Leaderboard />
    </div>
  );
}

export default App;
