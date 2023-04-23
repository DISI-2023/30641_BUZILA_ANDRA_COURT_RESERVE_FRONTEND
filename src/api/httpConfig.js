import axios from "axios";

//Modify with your backend port
const devEndpoint = "http://localhost:8080";

export const customHttp = axios.create({
  baseURL: devEndpoint,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
