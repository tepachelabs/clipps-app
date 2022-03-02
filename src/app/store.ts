import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth.reducer";
import videosReducer from "../reducers/videos.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videosReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
