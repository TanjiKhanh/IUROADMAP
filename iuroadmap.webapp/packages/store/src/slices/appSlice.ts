import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenProfile, parseToken } from '@iuroadmap/core';

export type DisplayMode = 'auto' | 'desktop' | 'mobile';

export interface AppState {
  accessToken: string | null;
  profile: TokenProfile | null;
  isInitialized: boolean;
  displayMode: DisplayMode;
}

const initialState: AppState = {
  accessToken: null,
  profile: null,
  isInitialized: false,
  displayMode: (localStorage.getItem('iuroadmap.web.displayMode') as DisplayMode) || 'auto',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      const profile = parseToken(action.payload);
      state.accessToken = profile ? action.payload : null;
      state.profile = profile;
    },
    setTokenProfile: (state, action: PayloadAction<TokenProfile | null>) => {
      state.profile = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.profile = null;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
      state.displayMode = action.payload;
      localStorage.setItem('iuroadmap.web.displayMode', action.payload);
    },
  },
});

export const { setAccessToken, setTokenProfile, clearAuth, setInitialized, setDisplayMode } = appSlice.actions;

export const selectAccessToken = (state: { app: AppState }) => state.app.accessToken;
export const selectIsAuthenticated = (state: { app: AppState }) => Boolean(state.app.accessToken);
export const selectTokenProfile = (state: { app: AppState }) => state.app.profile;
export const selectDisplayMode = (state: { app: AppState }) => state.app.displayMode;

export default appSlice.reducer;
