import axios from "axios";

const devEndpoint = "https://localhost:3000";

export const customHttp = axios.create({
  baseURL: devEndpoint,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
