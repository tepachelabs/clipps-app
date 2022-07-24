import type { AxiosInstance } from "axios";
import axios from "axios";

import config from "~/config";

const { apiGatewayUrl } = config;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiGatewayUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export const api = axiosInstance;
