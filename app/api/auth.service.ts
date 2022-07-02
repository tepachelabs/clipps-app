import * as Sentry from "@sentry/browser";
import type { AxiosError } from "axios";
import axios from "axios";

import config from "~/config";

interface LoginForm {
  email: string;
  password: string;
}

interface AuthApiResponse {
  token?: string;
  error?: string;
  errors?: AuthApiError[];
}

interface AuthApiError {
  rule: string;
  field: string;
  message: string;
}

interface RegisterForm extends LoginForm {
  code: string;
  passwordConfirmation: string;
}

const { apiGatewayUrl } = config;

export const login = async ({ email, password }: LoginForm): Promise<AuthApiResponse> =>
  axios
    .post<AuthApiResponse>(`${apiGatewayUrl}/login`, {
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

export const register = async ({
  code,
  email,
  password,
  passwordConfirmation,
}: RegisterForm): Promise<AuthApiResponse> =>
  axios
    .post<AuthApiResponse>(`${apiGatewayUrl}/register`, {
      code,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
    .then(({ data }) => data)
    .catch((error: AxiosError) => {
      Sentry.captureException(error);

      if (error.response?.status === 422) {
        const data = error.response?.data as AuthApiResponse;
        const errors = new Map<string, boolean>();

        data.errors?.forEach((apiError: AuthApiError) => errors.set(apiError.field, true));

        if (errors.get("code")) {
          return { error: "Invitation code is not valid" };
        }
        if (errors.get("email")) {
          return { error: "Email is already taken" };
        }
        if (errors.get("password_confirmation")) {
          return { error: "Confirmation password doesn't match" };
        }
        return { error: "Data is wrong" };
      }
      if (error.response?.status === 400) {
        return { error: "Invitation code is not valid" };
      }
      return { error: "Service appears offline. Try again later!" };
    });
