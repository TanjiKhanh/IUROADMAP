# HSSE Web Authentication Flow - Chi Tiết

**Tài liệu này giải thích luồng đăng nhập từ A-Z trong HSSE web, mỗi file làm gì và dữ liệu flow như thế nào.**

---

## 📋 Tổng Quan Luồng

```
1. User nhập điện thoại + password → LoginPage
2. Call API login → Nhận JWT token
3. Parse JWT → Extract roles + userData
4. Store token + profile vào Redux
5. ProtectedRoute check auth → cho phép vào
6. TenantSelectGuard check tenant (super-admin case)
7. buildSidebarMenu() filter routes dựa roles
8. Render sidebar + route accessible
```

---

## 🔑 Phase 1: App Boot & Token Rehydrate (BEFORE Router Mounts)

### File: `apps/hsse/src/main.tsx`

**Nhiệm vụ:** App khởi động, trước khi router render, parse token từ localStorage và load vào Redux.

**Flow:**
```typescript
// 1. App starts
ReactDOM.createRoot(rootElement).render(<App />)

// 2. BEFORE <App> renders, call hydrateFromStoredToken()
// (Điều này chạy ở top level, sync, trước router)

hydrateFromStoredToken() {
  // 2a. Read token từ localStorage
  const token = localStorage.getItem(APP_STORAGE_KEYS.token)
  
  // 2b. Parse JWT
  const profile = parseToken(token)
  // Result: TokenProfile = { userId, fullName, roles: [], isSuperAdmin, tenantId, ... }
  
  // 2c. Dispatch vào Redux
  store.dispatch(setTokenProfile(profile))
  
  // 2d. Regular user: set tenant immediately (từ JWT)
  //     Super-admin: defer to TenantSelectGuard (sẽ chọn sau)
  if (!profile.isSuperAdmin) {
    store.dispatch(setTenantId(profile.tenantId || null))
    store.dispatch(setShowTenantPicker(false))
  }
}

// 3. Setup API interceptor for auth header
bootstrapApi({
  onUnauthorized: () => {
    // If token expired/invalid, navigate to login
    store.dispatch(signOut())
    router.navigate(RoutePaths.web.auth.login)
  }
})

// 4. Router mounts — now Redux state is ready
<App> → <RouterProvider router={router} />
```

**Redux State sau bước này:**
```typescript
AppState {
  accessToken: "eyJhbGciOiJIUzI1NiIs...",
  tokenProfile: {
    userId: "user-123",
    fullName: "Nguyễn Văn A",
    roles: ["PTW_ADMIN", "SOR_USER"],      // ← Key: roles list
    isSuperAdmin: false,
    isCustomerAdmin: false,
    tenantId: "tenant-456"
  },
  profile: { // (copy của tokenProfile minus expiresAt)
    userId: "user-123",
    fullName: "Nguyễn Văn A",
    roles: ["PTW_ADMIN", "SOR_USER"],
    tenantId: "tenant-456",
    isSuperAdmin: false
  },
  tenantId: "tenant-456"
}
```

---

## 🔐 Phase 2: Login Page (User Inputs Credentials)

### File: `apps/hsse/src/views/auth/loginPage.tsx`

**Nhiệm vụ:** UI form login, gửi credentials, nhận token, parse, store vào Redux.

**Flow:**

```typescript
export function LoginPage() {
  const dispatch = useAppDispatch()
  const authenticated = useAppSelector(selectIsAuthenticated)
  
  // Step 1: If already authenticated, redirect to home
  useEffect(() => {
    if (authenticated) {
      navigate(RoutePaths.web.root)  // Bypass login page
    }
  }, [authenticated])
  
  // Step 2: User fills form (phonenumber + password)
  const onSubmit = form.handleSubmit((values) => {
    const payload: LoginRequest = {
      phonenumber: values.phonenumber,
      password: values.password
    }
    
    // Step 3: Call API mutation
    loginMutation.mutate(payload, {
      onSuccess: (res) => {
        // res = { access_token: "jwt..." }
        
        // Step 3a: Parse JWT
        const profile = parseToken(res.access_token)
        // Result: TokenProfile = { userId, fullName, roles[], isSuperAdmin, tenantId, ... }
        
        if (!profile) {
          toast.error("Token expired")
          return
        }
        
        // Step 3b: Save token to localStorage
        localStorage.setItem(APP_STORAGE_KEYS.token, res.access_token)
        
        // Step 3c: Dispatch to Redux
        dispatch(setAccessToken(res.access_token))
        dispatch(setTokenProfile(profile))  // ← This triggers profile update
        
        // Step 3d: Handle tenant selection
        if (profile.isSuperAdmin) {
          // Super-admin: open tenant picker modal
          dispatch(setTenantId(null))
          dispatch(setShowTenantPicker(true))
        } else {
          // Regular user: tenant already in JWT
          dispatch(setTenantId(profile.tenantId || null))
          dispatch(setShowTenantPicker(false))
        }
        
        // Step 3e: Navigate to home
        navigate(RoutePaths.web.root)
      },
      onError: (error) => {
        toast.error("Invalid credentials")
      }
    })
  })
  
  return <UiForm .../>
}
```

**API Call Diagram:**
```
Frontend                          Backend
─────────────────────────────────────────────
POST /api/auth/login ──────────►
  { phonenumber: "0123456789",
    password: "abc123" }
                                  ✓ Verify user
                                  ✓ Check password
                                  ✓ Extract roles from database
                                  ✓ Create JWT claims:
                                    - ClaimTypes.NameIdentifier = userId
                                    - ClaimTypes.MobilePhone = phone
                                    - ClaimTypes.Email = email
                                    - SopClaimTypes.FullName = fullName
                                    - SopClaimTypes.RoleId = roleId
                                    - SopClaimTypes.Tenant = tenantId
                                    - ClaimTypes.Role = "PTW_ADMIN"
                                    - ClaimTypes.Role = "SOR_USER"
                                    (multiple Role claims for each role)
                                    - SopClaimTypes.IsAdmin = true/false
                                  ✓ Sign JWT
                                  ◄───────── { access_token: "jwt..." }
Store in Redux
```

---

## 🔓 Phase 3: JWT Parsing (Extract Roles & User Data)

### File: `packages/core/src/auth/jwt.ts`

**Nhiệm vụ:** Decode JWT, extract roles + user data, return structured TokenProfile.

**JWT Structure (Backend Generated):**
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "user-123",
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone": "0123456789",
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": "user@example.com",
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": [
      "PTW_ADMIN",
      "SOR_USER"
    ],
    "full_name": "Nguyễn Văn A",
    "roleId": "role-456",
    "tenant": "tenant-123",
    "ad": false,
    "is_cus_ad": false,
    "exp": 1692892800,
    "iat": 1692807600
  },
  "signature": "..."
}
```

**Parsing Code:**
```typescript
// apps/hsse/src/auth/jwt.ts (re-exports from packages/core)
export { parseToken, tokenProfileToAuthProfile } from '@sop/core'
export type { TokenProfile, AuthProfile } from '@sop/core'

// packages/core/src/auth/jwt.ts - actual parsing logic
export function parseToken(token: string | null | undefined): TokenProfile | null {
  if (!token) return null
  
  // 1. Split JWT into 3 parts
  const parts = token.split('.')
  if (parts.length < 2) return null
  
  // 2. Decode payload (base64url → utf-8 string)
  const jsonPayload = decodeBase64UrlSegment(parts[1])
  if (!jsonPayload) return null
  
  // 3. Parse JSON
  let claims: RawJwtClaims
  try {
    claims = JSON.parse(jsonPayload)
  } catch {
    return null
  }
  
  // 4. Check expiration
  const exp = claims.exp ?? 0
  if (!exp || Math.floor(Date.now() / 1000) >= exp) {
    return null  // Expired
  }
  
  // 5. Extract roles from Microsoft role claim
  const roleClaim = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  const roles: string[] = Array.isArray(roleClaim)
    ? roleClaim.filter((r): r is string => typeof r === 'string')
    : typeof roleClaim === 'string'
      ? [roleClaim]
      : []
  
  // 6. Build TokenProfile
  return {
    userId: readStringClaim(claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']),
    fullName: readStringClaim(claims.full_name),
    phoneNumber: readStringClaim(claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone']),
    email: readStringClaim(claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']),
    tenantId: readStringClaim(claims.tenant),
    roleId: readStringClaim(claims.roleId),
    roles,  // ← Array of PMS roles: ["PTW_ADMIN", "SOR_USER", ...]
    isSuperAdmin: readBoolClaim(claims.ad),
    isCustomerAdmin: readBoolClaim(claims.is_cus_ad),
    expiresAt: exp
  }
}
```

**Output TokenProfile:**
```typescript
interface TokenProfile {
  userId: string              // "user-123"
  fullName: string            // "Nguyễn Văn A"
  phoneNumber: string         // "0123456789"
  email: string               // "user@example.com"
  tenantId: string            // "tenant-123"
  roleId: string              // "role-456"
  roles: string[]             // ["PTW_ADMIN", "SOR_USER"] ← KEY!
  isSuperAdmin: boolean       // false
  isCustomerAdmin: boolean    // false
  expiresAt: number           // 1692892800 (seconds since epoch)
}
```

---

## 📦 Phase 4: Store Profile in Redux

### File: `apps/hsse/src/store/appSlice.ts` & `apps/hsse/src/store/index.ts`

**Nhiệm vụ:** Redux state management, centralized auth state.

**Redux Action:**
```typescript
// appSlice.ts
const appSlice = createSlice({
  name: 'app',
  initialState: { accessToken: null, profile: null, tenantId: null, ... },
  reducers: {
    setTokenProfile(state, action: PayloadAction<TokenProfile | null>) {
      state.tokenProfile = action.payload
      // Also project into profile (for components)
      state.profile = action.payload 
        ? tokenProfileToAuthProfile(action.payload) 
        : null
    },
    setTenantId(state, action: PayloadAction<string | null>) {
      state.tenantId = action.payload
    },
    signOut(state) {
      state.accessToken = null
      state.profile = null
      state.tokenProfile = null
      state.tenantId = null
    }
    // ...
  }
})
```

**Redux Selectors (hook-style):**
```typescript
// index.ts
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Common selectors
export const selectAccessToken = (state: RootState) => state.app.accessToken
export const selectProfile = (state: RootState) => state.app.profile
export const selectTokenProfile = (state: RootState) => state.app.tokenProfile
export const selectIsAuthenticated = (state: RootState) => Boolean(state.app.accessToken)
export const selectIsSuperAdmin = (state: RootState) => Boolean(state.app.profile?.isSuperAdmin)

// Usage in component:
const profile = useAppSelector(selectProfile)
const roles = profile?.roles // ["PTW_ADMIN", "SOR_USER"]
```

---

## 🛣️ Phase 5: Router Protection & Navigation

### File: `apps/hsse/src/router/protectedRoute.tsx`

**Nhiệm vụ:** Guard routes - cho phép vào chỉ khi authenticated.

```typescript
export interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authenticated = useAppSelector(selectIsAuthenticated)
  // selectIsAuthenticated = Boolean(state.app.accessToken)
  
  const location = useLocation()
  
  // Not authenticated → redirect to login
  if (!authenticated) {
    return <Navigate to={RoutePaths.web.auth.login} 
                     state={{ from: location.pathname }} 
                     replace />
  }
  
  // Authenticated → render children (app layout)
  return <>{children}</>
}
```

**Usage in router config:**
```typescript
// apps/hsse/src/router/index.tsx
const protectedRouters: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <TenantSelectGuard>
          <ResponsiveLayout />
        </TenantSelectGuard>
      </ProtectedRoute>
    ),
    children: [
      { path: RoutePaths.web.root, element: <HomePage /> },
      { path: RoutePaths.web.sor.root, element: <SORListPage /> },
      // ... all protected routes
    ]
  }
]

export const router = createBrowserRouter([
  // Public routes (no auth needed)
  { path: RoutePaths.web.policy, element: <PolicyPage /> },
  { path: RoutePaths.web.auth.login, element: <LoginPage /> },
  
  // Protected routes
  ...protectedRouters,
  
  // Fallback
  { path: '*', element: <Navigate to={RoutePaths.web.root} replace /> }
])
```

---

## 👥 Phase 6: Tenant Selection (Super-Admin Only)

### File: `apps/hsse/src/auth/tenantSelectGuard.tsx`

**Nhiệm vụ:** Super-admin chọn tenant trước khi vào app.

```typescript
export function TenantSelectGuard({ children }: TenantSelectGuardProps) {
  const dispatch = useAppDispatch()
  const tokenProfile = useAppSelector(selectTokenProfile)
  const isSuperAdmin = useAppSelector(selectIsSuperAdmin)
  const tenantId = useAppSelector(selectTenantId)
  
  // Fetch available tenants from API
  const { data: tenants, isLoading } = useCustomerGetByCurentUser({
    query: { enabled: Boolean(tokenProfile) }
  })
  
  useEffect(() => {
    if (!isSuperAdmin || !tenants) return
    
    // Super-admin with no tenant selected
    if (!tenantId) {
      // Open modal for tenant selection
      dispatch(setShowTenantPicker(true))
    }
  }, [isSuperAdmin, tenantId, tenants])
  
  // Regular user OR super-admin with tenant selected → render app
  if (!isSuperAdmin || tenantId) {
    return <>{children}</>
  }
  
  // Super-admin, no tenant → show modal
  return <SelectTenantModal open={true} tenants={tenants} onSelect={handleSelect} />
}
```

---

## 🎯 Phase 7: Build Menu Based on Roles

### File: `apps/hsse/src/layouts/menuConfig.ts` & `packages/core/src/menus/menuHelper.ts`

**Nhiệm vụ:** Filter menu items dựa vào user's roles.

**Flow:**

```typescript
// menuConfig.ts
export function buildSidebarMenu(userPms: string[]): AppMenuItem[] {
  // 1. Call getProfileMenu with user's roles
  const groups = getProfileMenu(userPms, 'web')
  // getProfileMenu returns only the menu groups/items this user can see
  
  // 2. Convert SOPMenu → AppMenuItem (map icons, labels, etc.)
  const main = groups.map(groupToAppMenu)
  
  return main
}

// Usage in sidebar component:
export function SidebarMenu({ inlineCollapsed, onNavigate }: SidebarMenuProps) {
  const profile = useAppSelector(selectProfile)
  
  // Build menu from user's roles
  const tree = useMemo(() => 
    buildSidebarMenu(profile?.roles ?? []), 
    [profile?.roles]
  )
  
  const items = toUiMenuItems(tree)
  
  return <UiMenu items={items} ... />
}
```

**getProfileMenu Logic:**
```typescript
// packages/core/src/menus/menuHelper.ts
export function getProfileMenu(
  userPms: PMS[],
  platform: 'web' | 'mobile',
  isSuperAdmin = false
) {
  const menus: SOPMenu[] = []
  
  allMenuApp.forEach((menu: SOPMenu) => {
    // Filter items based on user's roles
    const accessibleItems = menu.items.filter((item: SOPMenuItem) => {
      // 1. Check platform (web vs mobile)
      if (platform === 'web' && item.isDisplayVerticalNav === false) {
        return false
      }
      
      // 2. Super-admin sees everything
      if (isSuperAdmin) {
        return true
      }
      
      // 3. ignorePms items are public (no role check needed)
      if (item.ignorePms) {
        return true
      }
      
      // 4. No roles required = accessible
      if (!item.roles || item.roles.length === 0) {
        return true
      }
      
      // 5. Check if user has any required role
      // item.roles = ["PTW_ADMIN", "PTW_USER"]
      // userPms = ["PTW_ADMIN", "SOR_USER"]
      // → user can access if: userPms includes "PTW_ADMIN" or "PTW_USER"
      return item.roles.some((role: string) => 
        userPms.includes(role as PMS)
      )
    })
    
    // Only include menu if has accessible items
    if (accessibleItems.length > 0) {
      menus.push({
        ...menu,
        items: accessibleItems
      })
    }
  })
  
  return menus
}
```

**Master Menu Config:**
```typescript
// packages/core/src/constants/navigation.ts
export const allMenuApp: SOPMenu[] = [
  {
    key: 'ptw',
    groupName: 'sidebar.ptw',  // i18n key
    items: [
      {
        path: '/ptw/list',
        title: 'sidebar.ptw.list',
        roles: ['PTW_ADMIN', 'PTW_USER'],  // ← Only these roles can see
        isDisplayVerticalNav: true
      },
      {
        path: '/ptw/create',
        title: 'sidebar.ptw.create',
        roles: ['PTW_ADMIN'],  // ← Only admin can create
        isDisplayVerticalNav: true
      },
      {
        path: '/dashboard',
        title: 'sidebar.dashboard',
        roles: [],  // ← Everyone can see (no role required)
        ignorePms: true  // or just empty roles array
      }
    ]
  },
  // ... more menu groups
]
```

---

## 🔄 Complete Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│ 1. App Starts (main.tsx)                                     │
│    ↓ hydrateFromStoredToken() BEFORE router mounts           │
│    ↓ localStorage.getItem('sop.token')                       │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│ 2. Parse JWT (packages/core/auth/jwt.ts)                    │
│    ↓ parseToken(token) → TokenProfile                       │
│    ↓ Extract: userId, fullName, roles[], tenantId           │
│    ↓ Check: is expired? is malformed?                       │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│ 3. Store in Redux (store/appSlice.ts)                        │
│    ↓ dispatch(setTokenProfile(profile))                     │
│    ↓ Redux state updated:                                   │
│      - app.tokenProfile = { userId, roles: [...], ... }     │
│      - app.profile = { userId, roles: [...], ... }          │
│      - app.accessToken = "jwt..."                           │
│      - app.tenantId = "..."                                 │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│ 4. Router Mounts (router/index.tsx)                          │
│    ↓ <ProtectedRoute> checks selectIsAuthenticated           │
│    ↓ If false: → Navigate to /login                         │
│    ↓ If true: → Render <ResponsiveLayout>                   │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│ 5. Tenant Guard (auth/tenantSelectGuard.tsx)                 │
│    ↓ Regular user: render children (app)                    │
│    ↓ Super-admin: check if tenant selected                  │
│      - No: show modal for selection                         │
│      - Yes: render children (app)                           │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│ 6. Sidebar Renders (layouts/sidebarMenu.tsx)                │
│    ↓ useAppSelector(selectProfile) → get roles[]            │
│    ↓ buildSidebarMenu(roles) from menuConfig.ts             │
│    ↓ getProfileMenu(roles, 'web') filters items             │
│    ↓ Only items user has role for → show in sidebar         │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│ 7. API Requests                                              │
│    ↓ bootstrap bootstrapApi() sets up axios interceptor      │
│    ↓ Every request includes header:                         │
│      Authorization: Bearer {accessToken}                   │
│    ↓ If 401 → dispatch signOut() & navigate to login        │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│ 8. User Navigates                                            │
│    ↓ Click menu item → /sor/list (if has SOR_USER role)    │
│    ↓ Click menu item → /ptw/create (if has PTW_ADMIN role)│
│    ↓ Hidden menu items → not clickable (role check failed)  │
└──────────────────────────────────────────────────────────────┘
```

---

## 📄 File Reference Quick Lookup

| File | Path | Nhiệm vụ | Key Functions/Exports |
|------|------|----------|----------------------|
| **main.tsx** | `apps/hsse/src/` | App boot, token rehydrate | `hydrateFromStoredToken()`, `bootstrapApi()` |
| **appSlice.ts** | `apps/hsse/src/store/` | Redux state definition | `setTokenProfile`, `setTenantId`, `signOut` |
| **index.ts** (store) | `apps/hsse/src/store/` | Redux hooks + selectors | `useAppDispatch`, `useAppSelector`, `selectProfile`, `selectIsAuthenticated` |
| **jwt.ts** | `packages/core/src/auth/` | JWT parsing | `parseToken()` → `TokenProfile` |
| **protectedRoute.tsx** | `apps/hsse/src/router/` | Route guard | `<ProtectedRoute>` wrapper |
| **index.tsx** (router) | `apps/hsse/src/router/` | Route config | `protectedRouters[]`, `router` object |
| **tenantSelectGuard.tsx** | `apps/hsse/src/auth/` | Tenant selection (super-admin) | `<TenantSelectGuard>` wrapper |
| **loginPage.tsx** | `apps/hsse/src/views/auth/` | Login UI + API call | `onSubmit`, `loginMutation` |
| **menuConfig.ts** | `apps/hsse/src/layouts/` | Menu tree builder | `buildSidebarMenu()`, `groupToAppMenu()` |
| **menuHelper.ts** | `packages/core/src/menus/` | Role-based menu filter | `getProfileMenu()` |
| **navigation.ts** | `packages/core/src/constants/` | Master menu config | `allMenuApp[]` + `SOPMenu`, `SOPMenuItem` interfaces |
| **roles.ts** | `packages/core/src/enums/` | PMS enum (all available roles) | `enum PMS { PTW_ADMIN, SOR_USER, ... }` |
| **routePaths.ts** | `packages/core/src/constants/` | Route constants | `RoutePaths.web.auth.login`, `RoutePaths.web.sor.root` |
| **loginPage.tsx** | `apps/hsse/src/views/auth/` | Login page | `<LoginPage>` component |
| **sidebarMenu.tsx** | `apps/hsse/src/layouts/` | Sidebar UI rendering | `<SidebarMenu>` component |

---

## 🔐 JWT Claims Mapping (Backend → Frontend)

**Backend (sop.api):**
```csharp
// sop.api/src/Sop.Application/Contract/Authentication/Services/AuthenticationService.cs
List<Claim> claims = new()
{
    new Claim(ClaimTypes.MobilePhone, accountResult.PhoneNumber),           // ← phone
    new Claim(ClaimTypes.NameIdentifier, accountResult.UserId.ToString()), // ← userId
    new Claim(SopClaimTypes.FullName, user.FullName),                      // ← fullName
    new Claim(ClaimTypes.Email, accountResult.Email),                      // ← email
    new Claim(SopClaimTypes.RoleId, user.RoleId.ToString()),               // ← roleId
    new Claim(SopClaimTypes.IsCustomerAdmin, (...).ToString()),            // ← isCustomerAdmin
    new Claim(SopClaimTypes.Tenant, user.TenantId.ToString()),             // ← tenantId
    new Claim(SopClaimTypes.IsAdmin, (...).ToString()),                    // ← isSuperAdmin
    // ... for each permission/role:
    new Claim(ClaimTypes.Role, "PTW_ADMIN"),                               // ← roles[]
    new Claim(ClaimTypes.Role, "SOR_USER"),                                // ← roles[]
};
```

**Frontend (sop.webapp):**
```typescript
// packages/core/src/auth/jwt.ts
const roles: string[] = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
// Result: ["PTW_ADMIN", "SOR_USER", ...]

const profile: TokenProfile = {
  userId: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
  fullName: claims.full_name,
  phoneNumber: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'],
  email: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
  tenantId: claims.tenant,
  roleId: claims.roleId,
  roles,  // ← ["PTW_ADMIN", "SOR_USER", ...]
  isSuperAdmin: claims.ad,
  isCustomerAdmin: claims.is_cus_ad,
  expiresAt: claims.exp
}
```

---

## 🧪 Debugging Tips

### 1. Check Redux State
```typescript
// In browser DevTools console
store.getState()
// Output:
// {
//   app: {
//     accessToken: "eyJ...",
//     tokenProfile: { userId: "...", roles: ["PTW_ADMIN", ...], ... },
//     profile: { userId: "...", roles: ["PTW_ADMIN", ...], ... },
//     tenantId: "...",
//     ...
//   }
// }
```

### 2. Check localStorage
```typescript
localStorage.getItem('sop.token')
// Output: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

localStorage.getItem('sop.hsse.tenantId')
// Output: tenant-123
```

### 3. Check JWT Token Content
```typescript
// Decode at jwt.io or in console
import { parseToken } from '@sop/core'
const profile = parseToken(localStorage.getItem('sop.token'))
console.log('Roles:', profile?.roles)
console.log('Tenant:', profile?.tenantId)
console.log('Is Admin:', profile?.isSuperAdmin)
```

### 4. Check Sidebar Menu
```typescript
// In component using sidebarMenu
import { getProfileMenu } from '@sop/core'
const roles = ['PTW_ADMIN', 'SOR_USER']
const menu = getProfileMenu(roles, 'web')
console.log('Accessible menu groups:', menu)
```

### 5. Network Tab (API Calls)
```
Headers:
Authorization: Bearer eyJ...

Body (POST /api/auth/login):
{
  "phonenumber": "0123456789",
  "password": "abc123"
}

Response (200):
{
  "access_token": "eyJ..."
}
```

---

## ⚠️ Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **Sidebar empty after login** | `profile.roles` not set in Redux | Check `setTokenProfile()` dispatch in loginPage |
| **Cannot access certain routes** | Route guard checking wrong selector | Check `selectIsAuthenticated` uses `app.accessToken` not `app.profile` |
| **"Token expired" on reload** | `parseToken()` returning null | Check JWT exp claim, localStorage quota |
| **Tenant picker always shows** | Super-admin tenantId not persisted | Check `TenantSelectGuard` logic, localStorage for `sop.hsse.tenantId` |
| **Menu items not filtering** | `getProfileMenu()` not filtering by roles | Check backend providing roles in JWT |
| **401 on every request** | Interceptor not attaching token header | Check `bootstrapApi()` in main.tsx |

---

## 📚 References

- **Backend JWT Generation:** `sop.api/src/Sop.Application/Contract/Authentication/Services/AuthenticationService.cs`
- **JWT Parsing:** `packages/core/src/auth/jwt.ts`
- **Redux State:** `apps/hsse/src/store/appSlice.ts`
- **Router Config:** `apps/hsse/src/router/index.tsx`
- **Menu Config:** `packages/core/src/constants/navigation.ts`
- **PMS Enum:** `packages/core/src/enums/roles.ts`

---

**Last Updated:** 2026-08-18
