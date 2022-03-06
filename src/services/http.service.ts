import axios, { AxiosError, AxiosInstance } from "axios";
import config from "../config";

const { apiGatewayUrl } = config;

interface ClippsResponseError {
  errors?: Error[];
}

const onResponseError = (error: AxiosError<ClippsResponseError>): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    console.error("Token is invalid or not included");
    location.pathname = "/login";
  }

  return Promise.reject(error);
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiGatewayUrl,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.response.use((response) => response, onResponseError);

export const api = axiosInstance;
