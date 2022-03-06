import { api } from "./http.service";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = (data: LoginParams) => api.post<LoginResponse>("/login", data);
