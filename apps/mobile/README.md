# Mobile Application (iuroadmap.mobile)

This is the mobile application wrapper for the IUROADMAP platform, built with Expo and React Native. It uses shared packages for state management and internationalization.

## Tech Stack
*   **Framework**: Expo (v51) & React Native (v0.74.5)
*   **State Management**: `@iuroadmap/store` (Shared Redux package)
*   **Internationalization**: `@iuroadmap/i18n` (Shared translation config)

## Prerequisites
*   Node.js >= 18.0.0
*   npm >= 9.0.0
*   Expo Go app on iOS/Android device OR simulators set up via Xcode/Android Studio.

## Quick Start

### 1. Run Development Server
Start the Expo development bundler:
```bash
# From the project root, target this workspace
npm run mobile:start

# Or run directly inside the apps/mobile directory
cd apps/mobile
npm run start
```

### 2. Run on Emulators
Ensure your simulator is running, then execute:
```bash
# iOS simulator
npm run mobile:ios

# Android emulator
npm run mobile:android
```

---

## Workspace Dependency Integration
*   `@iuroadmap/store`: Imports Redux global store configurations and actions.
*   `@iuroadmap/i18n`: Imports multi-language string translations.
