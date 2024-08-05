import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5010/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default instance;
