import axios from "axios";
import config from "../config";

const { apiGatewayUrl } = config;

export const http = axios.create({
  baseURL: apiGatewayUrl,
  headers: {
    "Content-type": "application/json",
  },
});
