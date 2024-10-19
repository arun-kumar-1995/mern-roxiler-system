import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5500/app/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// define get request

const getRequest = async (endpoint) => {
  try {
  } catch (err) {
    const response = await API.get(endpoint);
  }
};

export default API;
