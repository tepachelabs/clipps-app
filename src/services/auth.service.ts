import { api } from "./http.service";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterParams {
  email: string;
  password: string;
  confirmPassword: string;
}

export const login = (data: LoginParams) => api.post<LoginResponse>("/login", data);

export const register = (payload: RegisterParams) =>
  api.post<LoginResponse>("/register", {
    email: payload.email,
    password: payload.password,
    password_confirmation: payload.confirmPassword,
  });
