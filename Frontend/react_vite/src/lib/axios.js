import axios from "axios";

// const testURL = "http://localhost:3001/api"
// const actualURL ="

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", //   backend base URL
  withCredentials: true, // needed if using cookies
  headers: {
    "Content-Type": "application/json",
  },
});
