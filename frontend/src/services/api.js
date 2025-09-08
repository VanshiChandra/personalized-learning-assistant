import axios from "axios";

const backendURL = "https://your-backend-url.up.railway.app"; // replace with actual
const mlURL = "https://your-ml-service.up.railway.app";       // replace with actual

const api = axios.create({
  baseURL: backendURL,
});

// ML requests (special case)
api.ml = axios.create({
  baseURL: mlURL,
});

export default api;
