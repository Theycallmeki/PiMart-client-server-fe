import axios from "axios";

const api = axios.create({
  baseURL: "/api",               // 🔥 SAME-SITE via Vercel proxy
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
