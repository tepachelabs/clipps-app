import { createCookieSessionStorage, redirect } from "@remix-run/node";
import type { AxiosError } from "axios";
import axios from "axios";

type LoginForm = {
  email: string;
  password: string;
};

type LoginResponse = {
  token?: string;
  error?: string;
};

export const login = async ({
  email,
  password,
}: LoginForm): Promise<LoginResponse> =>
  axios
    .post<LoginResponse>("http://127.0.0.1:3333/v1/login", {
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

const sessionSecret = process.env.SESSION_SECRET;

const storage = createCookieSessionStorage({
  cookie: {
    name: "clipps_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret || "QWERTY"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const createUserSession = async (token: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set("token", token);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

export const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"));
};

export const getToken = async (request: Request) => {
  const session = await getUserSession(request);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token = session.get("token");
  if (!token || typeof token !== "string") return null;
  return token;
};

export const requireToken = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const session = await getUserSession(request);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token = session.get("token");
  if (!token || typeof token !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw redirect(`/login?${searchParams}`);
  }
  return token;
};

export const logout = async (request: Request) => {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
};
