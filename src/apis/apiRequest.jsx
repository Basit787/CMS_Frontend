import axios from "axios";
import SessionDetails from "../helpers/sessionDetails";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${SessionDetails.getAccessToken()}`,
  },
});

export default instance;
