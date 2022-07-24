import * as Sentry from "@sentry/browser";
import type { AxiosError } from "axios";

export const reportError = (error: AxiosError) => {
  Sentry.captureException(error);

  if (error.response?.status === 401) {
    throw "ERROR";
  }

  return null;
};
