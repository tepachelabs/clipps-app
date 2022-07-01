import type { AxiosError } from "axios";
import axios from "axios";

import config from "~/config";
const { apiGatewayUrl } = config;

type LoginForm = {
  email: string;
  password: string;
};

type LoginResponse = {
  token?: string;
  error?: string;
};

export const login = async ({ email, password }: LoginForm): Promise<LoginResponse> =>
  axios
    .post<LoginResponse>(`${apiGatewayUrl}/v1/login`, {
      email,
      password,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 422) {
        return { error: "Email/password combination is wrong." };
      }
      return { error: "Service appears offline. Try again later!" };
    });
