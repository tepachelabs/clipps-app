import type { AxiosRequestConfig } from "axios";

import type { Video } from "~/models";
import { reportError } from "~/utils/catch-network-error";

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
  is_private: boolean;
  original_url: string;
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
    isPrivate: data.is_private,
    originalUrl: data.original_url,
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
    .catch(reportError);

export const fetchDeletedVideos = async (token: string) =>
  api
    .get<ApiVideo[]>("/videos?deleted=true", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => parseVideoEntities(data))
    .catch(reportError);

export const fetchVideo = async (assetId: Video["assetId"], token: string) =>
  api
    .get<ApiVideo>(`/videos/${assetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => parseVideoEntity(data))
    .catch(reportError);

export const fetchVideoAnonymously = async (assetId: Video["assetId"]) =>
  api
    .get<ApiVideo>(`/video/${assetId}`)
    .then(({ data }) => parseVideoEntity(data))
    .catch(reportError);

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

export const deletePermanentlyByAssetId = (token: string, assetId: string) =>
  api.delete<unknown>(`/videos/${assetId}?permanent=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const update = async (
  token: string,
  assetId: string,
  title?: string,
  isPrivate?: boolean,
  deletedAt?: Date | null,
): Promise<Video | null> =>
  api
    .patch<ApiVideo>(
      `/videos/${assetId}`,
      { title, deletedAt, isPrivate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(({ data }) => parseVideoEntity(data))
    .catch(reportError);
