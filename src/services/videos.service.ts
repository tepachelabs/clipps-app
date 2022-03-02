import { http } from "./http.service";
import { Video } from "../models";
import { AxiosRequestConfig } from "axios";

export const getAll = (token: string) => {
  return http.get<Video[]>("/videos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const update = (token: string, assetId: string, title: string) => {
  return http.patch<Video>(
    `/videos/${assetId}`,
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getByAssetId = (assetId: string) => {
  return http.get<Video>(`/video/${assetId}`);
};

export const create = (token: string, selectedFile: Blob, config?: Partial<AxiosRequestConfig>) => {
  const formData = new FormData();
  formData.append("video", selectedFile);

  return http.post<Video>("/videos", formData, {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteByAssetId = (token: string, assetId: string) => {
  return http.delete<unknown>(`/videos/${assetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// import http from "../http-common";
// import ITutorialData from "../types/tutorial.type";
// class TutorialDataService {
//   getAll() {
//     return http.get<Array<ITutorialData>>("/tutorials");
//   }
//   get(id: string) {
//     return http.get<ITutorialData>(`/tutorials/${id}`);
//   }
//   create(data: ITutorialData) {
//     return http.post<ITutorialData>("/tutorials", data);
//   }
//   update(data: ITutorialData, id: any) {
//     return http.put<any>(`/tutorials/${id}`, data);
//   }
//   delete(id: any) {
//     return http.delete<any>(`/tutorials/${id}`);
//   }
//   deleteAll() {
//     return http.delete<any>("/tutorials");
//   }
//   findByTitle(title: string) {
//     return http.get<Array<ITutorialData>>(`/tutorials?title=${title}`);
//   }
// }
// export default new TutorialDataService();
