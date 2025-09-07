const BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

export async function signupUser(data) {
  const res = await fetch(`${BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function uploadScores(scores) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/scores/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ scores })
  });
  return res.json();
}

export async function getProgress() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/progress`, { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}

export async function getLeaderboard() {
  const res = await fetch(`${BASE}/leaderboard`);
  return res.json();
}
