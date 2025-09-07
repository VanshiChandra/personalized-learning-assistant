import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const uploadScores = (scores, token) => 
    API.post('/scores/upload', { scores }, { headers: { Authorization: `Bearer ${token}` } });
export const getRecommendations = (token) => 
    API.get('/scores/recommend', { headers: { Authorization: `Bearer ${token}` } });
export const getLeaderboard = () => API.get('/leaderboard');
