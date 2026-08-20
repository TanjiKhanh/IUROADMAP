import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { TenantDetailResponse } from '@sop/api-gen';
// Shared profile model — single source of truth (also used by apps/mobile).
import { type AuthProfile, type TokenProfile, tokenProfileToAuthProfile } from '@sop/core';

export type { AuthProfile } from '@sop/core';

export type DisplayMode = 'auto' | 'desktop' | 'mobile';

export interface AppState {
  accessToken: string | null;
  /** Mirror of the JWT-derived profile for components reading via selectors. */
  profile: AuthProfile | null;
  /** Full parsed token — kept for callers needing the raw `expiresAt`, etc. */
  tokenProfile: TokenProfile | null;
  language: 'en' | 'vi';
  displayMode: DisplayMode;
  /**
   * Active tenant for the session:
   *  - regular user: copied from the JWT's `tenant` claim.
   *  - super-admin: chosen via `<SelectTenantModal>` and persisted to
   *    `localStorage` so a reload doesn't re-prompt.
   *  - logged out: `null` — the request interceptor skips the `tenant` header.
   */
  tenantId: string | null;
  /** Tenants visible to the current user (returned by `/customer/GetInfrastructure`). */
  tenants: TenantDetailResponse[];
  /** When `true`, `<TenantSelectGuard>` renders the blocking picker instead of children. */
  showTenantPicker: boolean;
}

const LANGUAGE_STORAGE_KEY = 'sop.hsse.language';
const TOKEN_STORAGE_KEY = 'sop.token';
const DISPLAY_MODE_STORAGE_KEY = 'sop.hsse.displayMode';
const TENANT_ID_STORAGE_KEY = 'sop.hsse.tenantId';

function readInitialLanguage(): 'en' | 'vi' {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === 'en' || saved === 'vi') return saved;
  } catch {
    /* SSR / private mode — fall through */
  }
  return 'vi';
}

function readInitialToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function readInitialDisplayMode(): DisplayMode {
  try {
    const saved = localStorage.getItem(DISPLAY_MODE_STORAGE_KEY);
    if (saved === 'auto' || saved === 'desktop' || saved === 'mobile') return saved;
  } catch {
    /* fall through */
  }
  return 'auto';
}

function readInitialTenantId(): string | null {
  try {
    return localStorage.getItem(TENANT_ID_STORAGE_KEY);
  } catch {
    return null;
  }
}

const initialState: AppState = {
  accessToken: readInitialToken(),
  profile: null,
  tokenProfile: null,
  language: readInitialLanguage(),
  displayMode: readInitialDisplayMode(),
  tenantId: readInitialTenantId(),
  tenants: [],
  showTenantPicker: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    setProfile(state, action: PayloadAction<AuthProfile | null>) {
      state.profile = action.payload;
    },
    setTokenProfile(state, action: PayloadAction<TokenProfile | null>) {
      state.tokenProfile = action.payload;
      state.profile = action.payload ? tokenProfileToAuthProfile(action.payload) : null;
    },
    setLanguage(state, action: PayloadAction<'en' | 'vi'>) {
      state.language = action.payload;
    },
    setDisplayMode(state, action: PayloadAction<DisplayMode>) {
      state.displayMode = action.payload;
    },
    setTenantId(state, action: PayloadAction<string | null>) {
      state.tenantId = action.payload;
    },
    setTenants(state, action: PayloadAction<TenantDetailResponse[]>) {
      state.tenants = action.payload;
    },
    setShowTenantPicker(state, action: PayloadAction<boolean>) {
      state.showTenantPicker = action.payload;
    },
    signOut(state) {
      state.accessToken = null;
      state.profile = null;
      state.tokenProfile = null;
      state.tenantId = null;
      state.tenants = [];
      state.showTenantPicker = false;
    },
  },
});

export const {
  setAccessToken,
  setProfile,
  setTokenProfile,
  setLanguage,
  setDisplayMode,
  setTenantId,
  setTenants,
  setShowTenantPicker,
  signOut,
} = appSlice.actions;
export const appReducer = appSlice.reducer;

export const APP_STORAGE_KEYS = {
  language: LANGUAGE_STORAGE_KEY,
  token: TOKEN_STORAGE_KEY,
  displayMode: DISPLAY_MODE_STORAGE_KEY,
  tenantId: TENANT_ID_STORAGE_KEY,
} as const;
