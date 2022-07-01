import type { AxiosError } from "axios";

import type { Profile } from "~/models/profile.model";

import { api } from "./http.service";

export interface ApiProfile {
  username?: string;
  avatar?: string;
  bytes_used?: string;
}

const castDataToProfile = (data: ApiProfile): Profile => {
  return {
    username: data.username,
    avatar: data.avatar,
    bytesUsed: data.bytes_used,
  } as Profile;
};

const parseProfileEntity = (arg: ApiProfile): Profile => castDataToProfile(arg);

export const getProfile = async (token: string): Promise<Profile | null> =>
  api
    .get<ApiProfile>("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => parseProfileEntity(data))
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });

export const updateProfile = async (
  token: string,
  username: string,
  avatar: string
): Promise<Profile | null> => {
  return api
    .patch<ApiProfile>(
      "/profile",
      { username, avatar },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => parseProfileEntity(data))
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
};
