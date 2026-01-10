import axios from "axios";

const api = axios.create({
  baseURL: "https://test-server-flask-z1x9.onrender.com",  // 🔥 SAME-SITE via Vercel proxy
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;