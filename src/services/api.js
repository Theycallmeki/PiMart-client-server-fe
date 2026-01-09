import axios from "axios";

const api = axios.create({
  baseURL: "https://thesis-flask.onrender.com", // Deployed Flask API
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
