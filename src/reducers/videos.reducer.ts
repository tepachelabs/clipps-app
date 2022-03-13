import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Video } from "../models";
import { getAll } from "../services";

interface VideosState {
  videos: Video[];
  deletedVideos: Video[];
}

const initialState: VideosState = {
  videos: [],
  deletedVideos: [],
};

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async (token: string) => {
  return await getAll(token);
});

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.videos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      const videos: Video[] = [];
      const deletedVideos: Video[] = [];

      action.payload.forEach((video) => {
        if (video.deletedAt) {
          deletedVideos.push(video);
        } else {
          videos.push(video);
        }
      });

      state.videos = videos;
      state.deletedVideos = deletedVideos;
    });
  },
});

export const { setVideos } = videosSlice.actions;

export const selectVideos = (state: RootState) => state.videos.videos;
export const selectDeletedVideos = (state: RootState) => state.videos.deletedVideos;
export const selectVideoByAssetId = (assetId: string): ((state: RootState) => Video | undefined) =>
  createSelector(
    (state: RootState) => state.videos.videos,
    (videos: Video[]) => {
      return videos.find((video) => video.assetId === assetId);
    },
  );

export default videosSlice.reducer;
