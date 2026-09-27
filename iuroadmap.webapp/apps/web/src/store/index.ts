import { configureStore } from '@reduxjs/toolkit';
import { appReducer, type AppState } from './appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './appSlice';

export const selectAccessToken = (state: RootState): string | null => state.app.accessToken;
export const selectIsAuthenticated = (state: RootState): boolean => Boolean(state.app.accessToken);
export const selectTokenProfile = (state: RootState): AppState['tokenProfile'] => state.app.tokenProfile;
export const selectDisplayMode = (state: RootState): AppState['displayMode'] => state.app.displayMode;