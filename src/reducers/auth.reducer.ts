import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { deleteItem, getItem, setItem } from "../services";

interface AuthState {
  isAuthenticated: boolean;
  token: string;
}

const TOKEN = "CLIPPS_TOKEN";

const getInitialState = (): AuthState => {
  const token = getItem(TOKEN) || "";
  return { token, isAuthenticated: !!token };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      if (action.payload && action.payload.length) {
        state.token = action.payload;
        state.isAuthenticated = true;
        setItem(TOKEN, action.payload);
      } else {
        state.token = "";
        state.isAuthenticated = false;
        deleteItem(TOKEN);
      }
    },
  },
});

export const { setToken } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
