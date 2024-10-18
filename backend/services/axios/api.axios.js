import axios from "axios";
const { BASE_URL, PORT, REQUEST_TIMEOUT = 5000 } = process.env;
console.log(BASE_URL);

const API = axios.create({
  baseURL: `${BASE_URL}:${PORT}`,
  timeout: Number(REQUEST_TIMEOUT),
});

export const getRequest = async (endpoint) => {
  try {
    const { data } = await API.get(endpoint);
    return data;
  } catch (err) {
    if (err.response) {
      console.error(
        `Error ${err.response.status}: ${err.response.data.message}`
      );
    }
    if (err.request) {
      console.error("No response received from server", err.message);
    }
    console.error("Error in request setup", err.message);
  }
};
