import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Profile } from "../models";
import { getProfile } from "../services";

interface ProfileState {
  profile: Profile | null;
}

const initialState: ProfileState = {
  profile: null,
};

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (token: string) => {
  return await getProfile(token);
});

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { setProfile } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.profile;

export default profileSlice.reducer;
