import { http } from "./http.service";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = (data: LoginParams) => http.post<LoginResponse>("/login", data);
