import * as Sentry from "@sentry/browser";
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
    .post<LoginResponse>(`${apiGatewayUrl}/login`, {
      email,
      password,
    })
    .then(({ data }) => data)
    .catch((error: AxiosError) => {
      Sentry.captureException(error);
      if (error.response?.status === 422) {
        return { error: "Email/password combination is wrong." };
      }
      return { error: "Service appears offline. Try again later!" };
    });
