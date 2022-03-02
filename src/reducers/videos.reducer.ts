import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Video } from "../models";
import { getAll } from "../services";

interface VideosState {
  videos: Video[];
}

const initialState: VideosState = {
  videos: [],
};

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async (token: string) => {
  const { data } = await getAll(token);
  return data;
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
      state.videos = action.payload;
    });
  },
});

export const { setVideos } = videosSlice.actions;

export const selectVideos = (state: RootState) => state.videos.videos;
export const selectVideoByAssetId = (assetId: string): ((state: RootState) => Video | undefined) =>
  createSelector(
    (state: RootState) => state.videos.videos,
    (videos: Video[]) => {
      return videos.find((video) => video.asset_id === assetId);
    },
  );

export default videosSlice.reducer;
