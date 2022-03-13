import { api } from "./http.service";
import { Video } from "../models";
import { AxiosRequestConfig } from "axios";

export interface ApiVideo {
  asset_id: string;
  bytes: number;
  created_at: string;
  deleted_at: string;
  duration: number;
  secure_url: string;
  poster_url: string;
  title: string;
}

const castDataToVideo = (data: ApiVideo): Video => {
  return {
    assetId: data.asset_id,
    title: data.title,
    secureUrl: data.secure_url,
    posterUrl: data.poster_url,
    duration: data.duration,
    bytes: data.bytes,
    createdAt: data.created_at,
    deletedAt: data.deleted_at,
  } as Video;
};

const parseVideoEntity = (arg: unknown): Video => castDataToVideo(arg as ApiVideo);

const parseVideoEntities = (arg: unknown[]): Video[] =>
  arg.map((chunk: unknown) => castDataToVideo(chunk as ApiVideo));

export const getAll = async (token: string): Promise<Video[]> => {
  const { data } = await api.get<ApiVideo[]>("/videos?deleted=true", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return parseVideoEntities(data);
};

export const update = async (
  token: string,
  assetId: string,
  title: string,
  deletedAt?: Date | null,
): Promise<Video> => {
  const { data } = await api.patch<ApiVideo>(
    `/videos/${assetId}`,
    { title, deletedAt },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return parseVideoEntity(data);
};

export const getByAssetId = async (assetId: string): Promise<Video | null> => {
  const { data } = await api.get<ApiVideo>(`/video/${assetId}`);
  return data ? parseVideoEntity(data) : null;
};

export const create = (token: string, selectedFile: Blob, config?: Partial<AxiosRequestConfig>) => {
  const formData = new FormData();
  formData.append("video", selectedFile);

  return api.post<Video>("/videos", formData, {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteByAssetId = (token: string, assetId: string) => {
  return api.delete<unknown>(`/videos/${assetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const permanentlyDeleteByAssetId = (token: string, assetId: string) => {
  return api.delete<unknown>(`/videos/${assetId}?permanent=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
