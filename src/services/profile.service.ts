import { api } from "./http.service";
import { Profile } from "../models";

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

export const getProfile = async (token: string): Promise<Profile> => {
  const { data } = await api.get<ApiProfile>("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return parseProfileEntity(data);
};

export const updateProfile = async (
  token: string,
  username: string,
  avatar: string,
): Promise<Profile> => {
  const { data } = await api.patch<ApiProfile>(
    "/profile",
    { username, avatar },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return parseProfileEntity(data);
};
