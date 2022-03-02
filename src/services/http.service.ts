import axios from "axios";

export const http = axios.create({
  baseURL: "https://api.clipps.io/api",
  headers: {
    "Content-type": "application/json",
  },
});
