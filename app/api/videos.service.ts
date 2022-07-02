import type { AxiosRequestConfig } from "axios";
import type { AxiosError } from "axios";

import type { Video } from "~/models";

import { api } from "./http.service";

interface ApiVideo {
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

export const fetchVideos = async (token: string) =>
  api
    .get<ApiVideo[]>("/videos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => parseVideoEntities(data))
    .catch((error: AxiosError) => {
      console.error(error);
      return [];
    });

export const fetchVideo = async (assetId: Video["assetId"]) =>
  api
    .get<ApiVideo>(`/video/${assetId}`)
    .then(({ data }) => parseVideoEntity(data))
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });

export const uploadVideo = (
  token: string,
  selectedFile: Blob,
  config?: Partial<AxiosRequestConfig>,
) => {
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

export const deleteByAssetId = (token: string, assetId: string) =>
  api.delete<unknown>(`/videos/${assetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const update = async (
  token: string,
  assetId: string,
  title: string,
  deletedAt?: Date | null,
): Promise<Video | null> =>
  api
    .patch<ApiVideo>(
      `/videos/${assetId}`,
      { title, deletedAt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(({ data }) => parseVideoEntity(data))
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
