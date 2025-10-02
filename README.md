# 🔮 Mystic Tarot - Web & Mobile Monorepo

A beautiful, mystical tarot card reading experience built with Next.js 14, TypeScript, and Tailwind CSS. The project is now structured as a single repository that powers both the original web app and the upcoming Capacitor-based Android/iOS wrappers.

![Mystic Tarot](https://img.shields.io/badge/Tarot-Mystical-purple?style=for-the-badge&logo=crystal&logoColor=gold)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎴 Complete Tarot Experience

- **Full 78-card deck** covering both Major and Minor Arcana
- **Traditional meanings** for upright and reversed orientations
- **Three-card spread** for Past, Present, Future insights
- **Deterministic draws** powered by a seeded RNG for reproducibility

### 🌙 Mystical Interface

- **Dark mode by default** with a delightful theme toggle
- **Framer Motion animations** for smooth, magical transitions
- **Responsive design** that adapts to mobile, tablet, and desktop

### 📅 Daily Reading System

- **3 free readings per day** respecting tarot tradition
- **LocalStorage tracking** that persists between sessions
- **Daily limit enforcement** with a friendly UX

### ♿ Accessibility & UX

- **Keyboard navigation** and **screen reader friendly** markup
- **Reduced motion support** honoring user preferences
- **Focus management** with clear visual indicators

### 💰 Phase 1 Advertisement Flow

- **Environment-aware rendering** via `AdsSwitch`, exposing `<WebAdsense />` for web and `<MobileAdMob />` for Capacitor builds.
- **Interstitial trigger** automatically fires once a card spread is revealed on app targets.
- **Rewarded gating** ensures the "Deep Analysis" action only hits the API after a successful reward event.
- **Persistent banner** keeps AdMob banner ads anchored to the reading results while gracefully falling back when no plugin is available.

## 🏗️ Repository Layout (Phase 0)

```
tarot-app/
├── apps/
│   └── web/                 # Original Next.js 14 application
│       ├── app/             # App Router pages & API routes
│       ├── components/      # Web-specific UI building blocks
│       ├── lib/             # Tarot logic, localization, utilities
│       ├── locales/         # i18n JSON bundles
│       ├── public/          # Static assets
│       ├── styles/          # Tailwind and global CSS
│       ├── next.config.js   # Next.js project configuration
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       ├── middleware.ts
│       └── tsconfig.json
├── components/              # Cross-target React helpers
│   ├── AdsSwitch.tsx        # Environment-aware ad renderer
│   ├── MobileAdMob.tsx      # Capacitor AdMob banner bridge
│   └── WebAdsense.tsx       # Google AdSense slot renderer
├── lib/
│   ├── admob.ts             # AdMob wrapper (delegates to native plugin or stub)
│   └── stubs/
│       └── capacitor-admob.ts  # Local fallback when optional dependency is missing
├── android/                 # Android Capacitor platform
│   ├── app/
│   │   └── src/main/assets/public/  # Synced static export
│   ├── build.gradle
│   └── ...
├── ios/                     # iOS Capacitor platform
│   ├── App/
│   │   └── App/public/      # Synced static export
│   ├── App.xcodeproj
│   └── ...
├── .env.web.local           # Sample env vars for web builds
├── .env.app.local           # Sample env vars for app builds
├── .env.example             # Shared env template
├── capacitor.config.ts      # Capacitor configuration
├── codemagic.yaml           # CI/CD workflows for web, iOS, and Android
├── package.json             # Shared scripts & dependencies
├── tsconfig.json            # Monorepo TypeScript project references
└── README.md
```

Phase 0 established the monorepo foundation, and Phase 1 layers in the cross-target advertisement abstraction while keeping the original web experience intact for upcoming Capacitor packaging work.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (default). Yarn/pnpm will also work if you update lockfiles accordingly.

### Install dependencies

```bash
npm install
```

### Local development

Web target (default):

```bash
npm run dev           # alias for npm run dev:web
```

Capacitor target preview (environment flag only):

```bash
npm run dev:app
```

> ℹ️ The `NEXT_PUBLIC_BUILD_TARGET` flag is baked into the scripts. On Windows PowerShell you may need to set the variable manually (`$env:NEXT_PUBLIC_BUILD_TARGET='web'`) before invoking `next dev`.

### Production builds

Web deployment bundle:

```bash
npm run build:web
npm run start         # serve the production build locally
```

Mobile packaging bundle (static export consumed by Capacitor):

```bash
npm run build:app     # builds and exports to .next, then syncs native shells
```

After the export step completes, you can also use Capacitor tooling directly:

```bash
npx cap copy          # copies .next into each added native shell
npx cap open ios      # opens Xcode for iOS development
npx cap open android  # opens Android Studio for Android development
```

> ℹ️ `npm run build:app` now runs `next build` with static export, then triggers `scripts/sync-static-export.mjs` to copy
> the generated contents of `.next` into any existing Capacitor platforms (Android/iOS). If you need to re-sync without
> rebuilding, run `npm run sync:static`.

### Environment configuration

- `.env.web.local` – prefilled with `NEXT_PUBLIC_BUILD_TARGET=web`, AdSense client ID, and slot placeholders.
- `.env.app.local` – prefilled with `NEXT_PUBLIC_BUILD_TARGET=app` and Google-provided AdMob **test IDs**.
- `.env.example` – consolidated template for CI/onboarding. Copy it when provisioning new environments.

Load the appropriate file before building or deploy via your hosting provider's dashboard.

> ℹ️ `@capacitor-community/admob` and `@capacitor/core` are marked as optional dependencies. When they are unavailable (CI, preview builds, or network-restricted environments), the tooling falls back to `lib/stubs/capacitor-admob.ts` so web builds continue to succeed. Install the official packages before shipping native apps.

## 🎯 Core Functionality Overview

The core tarot experience remains unchanged from the original implementation:

1. **Localized landing page** invites users to start a reading.
2. **Seeded deck shuffle** produces a reproducible three-card spread.
3. **Interpretation engine** merges localized card meanings, orientations, and contextual copy.
4. **Deep analysis endpoint** (`/api/deep-analysis`) integrates with OpenAI and gracefully falls back to demo text when no API key is configured.

All modules now live under `apps/web` so they can later be imported into shared utilities or mobile facades without conflicting with Capacitor scaffolding.

## 🧭 Roadmap

- ✅ **Phase 0 – Monorepo foundation**: web app, shared assets, and build pipeline are established.
- ✅ **Phase 1 – Advertisement abstraction**: `<WebAdsense />`, `<MobileAdMob />`, and reward-gated flows are live in the reading experience.
- ✅ **Phase 2 – Capacitor shell**: Native iOS/Android projects initialized, CI/CD workflows configured for mobile builds.
- 🔜 **Phase 3 – Mobile UX polish**: handle offline storage, rewarded flows, and native-only affordances.
- 🔜 **Phase 4 – Release readiness**: document deployment, store submissions, and privacy questionnaires.

Each phase builds upon the monorepo foundation established in Phase 0.

## 📝 Scripts Reference

| Script                | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `npm run dev:web`     | Start Next.js dev server for the web target          |
| `npm run dev:app`     | Start dev server with `NEXT_PUBLIC_BUILD_TARGET=app` |
| `npm run build:web`   | Production build for web deployments                 |
| `npm run build:app`   | Production build for Capacitor export                |
| `npm run start`       | Run the built web bundle locally                     |
| `npm run export`      | Static export to `.next` for Capacitor               |
| `npm run sync:static` | Sync `.next` export to Capacitor platforms           |
| `npm run lint`        | ESLint (`apps/web`)                                  |
| `npm run format`      | Prettier formatting                                  |
| `npm run type-check`  | TypeScript project check                             |

## 🤖 Codemagic CI

Codemagic looks for [`codemagic.yaml`](codemagic.yaml) in the repository root. The configuration includes three workflows:

- **`mystic_tarot_static_export`**: Lints, type-checks, and generates the Capacitor static export via `npm run build:app`
- **`mystic_tarot_ios`**: Builds iOS app with Xcode, includes CocoaPods dependency management
- **`mystic_tarot_android`**: Builds Android APK/AAB with Gradle

### Android keystore 驗證流程

為了確保 Codemagic 與本機使用相同的簽章資訊，可依下列步驟進行檢查：

1. **確認 Codemagic secrets**：於 Codemagic 後台的 `android_signing` 群組（或 workflow secrets）核對 `CM_KEYSTORE`、`CM_KEYSTORE_PASSWORD`、`CM_KEY_ALIAS`、`CM_KEY_PASSWORD` 與實際 keystore 是否一致。
2. **本機驗證 keystore**：將 keystore 匯出為 `upload-keystore.jks` 後，使用預期的 store/key 密碼與 alias 執行：

   ```bash
   keytool -list -v -keystore upload-keystore.jks \
     -alias "<alias>" \
     -storepass "<store-password>" \
     -keypass "<key-password>"
   ```

   若指令失敗，請重新匯出 keystore 或更新密碼後再產生 Base64，並同步調整 `CM_KEYSTORE`。
3. **使用共用腳本驗證**：本機或 CI 皆可執行 [`scripts/verify-keystore.sh`](scripts/verify-keystore.sh) 來還原並驗證 keystore。以下範例會寫入 `android/app/upload-keystore.jks` 並輸出詳細資訊：

   ```bash
   export CM_KEYSTORE="$(base64 < upload-keystore.jks)"
   export CM_KEYSTORE_PASSWORD="<store-password>"
   export CM_KEY_PASSWORD="<key-password>"
   export CM_KEY_ALIAS="<alias>"

   ./scripts/verify-keystore.sh --output android/app/upload-keystore.jks
   ```

   Codemagic 會在 `mystic_tarot_android` workflow 中呼叫同一腳本，日誌可直接確認 `keytool` 驗證是否通過，再進行 `./gradlew bundleRelease` 打包。

### Workflow Triggers

- Manual runs from Codemagic UI
- Pushes to `main` branch (configure branch filters as needed)

### Build Configuration

- Build notifications are sent to `highandhigh96@hotmail.com` and `fish760217@gmail.com`; update [`codemagic.yaml`](codemagic.yaml) if you need to notify additional recipients.
- The workflows install dependencies with `npm install` (instead of `npm ci`) so optional packages like `@capacitor-community/admob` can be resolved automatically when the registry is reachable.

### Getting Started

1. Connect your GitHub repository to Codemagic
2. Press **Check for configuration file** in the Codemagic UI to validate the setup
3. Start your first build manually or push to the `main` branch

For code signing and app store publishing, configure certificates and provisioning profiles in the Codemagic UI.

## 📄 License

[MIT](LICENSE)
