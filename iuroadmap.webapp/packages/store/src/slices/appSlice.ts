import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenProfile, parseToken } from '@iuroadmap/core';

export interface AppState {
  accessToken: string | null;
  profile: TokenProfile | null;
  isInitialized: boolean;
}

const initialState: AppState = {
  accessToken: null,
  profile: null,
  isInitialized: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.profile = parseToken(action.payload);
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.profile = null;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setAccessToken, clearAuth, setInitialized } = appSlice.actions;

export const selectAccessToken = (state: { app: AppState }) => state.app.accessToken;
export const selectIsAuthenticated = (state: { app: AppState }) => Boolean(state.app.accessToken);
export const selectTokenProfile = (state: { app: AppState }) => state.app.profile;

export default appSlice.reducer;
