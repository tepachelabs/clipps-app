import { getProfile } from "~/api/profile.service";
import type { Profile } from "~/models";
import { getToken } from "~/utils/session.server";

export const requestProfile = async (request: Request): Promise<Profile | null> => {
  const token = await getToken(request);

  if (!token) return null;

  try {
    return await getProfile(token);
  } catch (e) {
    return null;
  }
};
