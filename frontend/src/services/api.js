import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' });

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const uploadScores = (token, scores) => API.post('/scores/upload', { scores }, { headers: { Authorization: token } });
export const getRecommendations = (token) => API.get('/scores/recommend', { headers: { Authorization: token } });
export const getLeaderboard = () => API.get('/leaderboard');
