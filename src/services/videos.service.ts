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

export const parseVideoEntity = (arg: unknown): Video => castDataToVideo(arg as ApiVideo);

export const parseVideoEntities = (arg: unknown[]): Video[] =>
  arg.map((chunk: unknown) => castDataToVideo(chunk as ApiVideo));

export const getAll = async (token: string): Promise<Video[]> => {
  const { data } = await api.get<ApiVideo[]>("/videos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return parseVideoEntities(data);
};

export const update = (token: string, assetId: string, title: string) => {
  return api.patch<Video>(
    `/videos/${assetId}`,
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getByAssetId = async (assetId: string): Promise<Video> => {
  const { data } = await api.get<ApiVideo>(`/video/${assetId}`);
  return parseVideoEntity(data);
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
