import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.VITE_GATEWAY_URL,
  baseURL: "http://localhost:8000/api", // Use the correct base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // if using cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;