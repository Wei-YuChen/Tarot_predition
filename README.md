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
├── mobile/
│   ├── capacitor.config.ts  # Capacitor shell configuration
│   ├── ios/                 # iOS platform assets (placeholder)
│   └── android/             # Android platform assets (placeholder)
├── .env.web.local           # Sample env vars for web builds
├── .env.app.local           # Sample env vars for app builds
├── .env.example             # Shared env template
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
npm run build:app     # builds and exports to apps/web/out, then syncs native shells when available
```

After the export step completes, continue with Capacitor tooling (to be completed in later phases):

```bash
npx cap copy          # copies apps/web/out into each added native shell
npx cap open ios
npx cap open android
```

> ℹ️ `npm run build:app` now runs `next build` followed by `next export`, then triggers `scripts/sync-static-export.mjs` to copy
> the generated contents of `apps/web/out` into any existing Capacitor platforms (Android/iOS). If you need to re-sync without
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

- ✅ **Phase 1 – Advertisement abstraction**: `<WebAdsense />`, `<MobileAdMob />`, and reward-gated flows are live in the reading experience.
- 🔜 **Phase 2 – Capacitor shell**: initialize native projects, configure permissions, and sync exported assets.
- 🔜 **Phase 3 – Mobile UX polish**: handle offline storage, rewarded flows, and native-only affordances.
- 🔜 **Phase 4 – Release readiness**: document deployment, store submissions, and privacy questionnaires.

Each phase builds upon the monorepo foundation established in Phase 0.

## 📝 Scripts Reference

| Script               | 說明                                                                 |
| -------------------- | -------------------------------------------------------------------- |
| `npm run dev:web`    | 啟動以網頁為目標的 Next.js 開發伺服器                                  |
| `npm run dev:app`    | 以 `NEXT_PUBLIC_BUILD_TARGET=app` 啟動 Next.js 開發伺服器             |
| `npm run build:web`  | 產出網頁佈署用的 production bundle                                    |
| `npm run build:app`  | 建置並匯出 `apps/web/out`，完成後自動呼叫同步腳本複製到 Capacitor 殼層 |
| `npm run start`      | 在本機啟動已建置的網頁版 bundle                                       |
| `npm run export`     | 單獨執行 `next export` 產出靜態檔                                     |
| `npm run sync:static`| 將既有 `apps/web/out` 靜態資產再次複製到已存在的 Capacitor 平台        |
| `npm run lint`       | 執行 ESLint（範圍為 `apps/web`）                                      |
| `npm run format`     | 使用 Prettier 進行程式碼排版                                          |
| `npm run type-check` | 執行 TypeScript 型別檢查（`apps/web` 專案）                            |

## 🤖 Codemagic CI

- Codemagic 會在儲存庫根目錄尋找 [`codemagic.yaml`](codemagic.yaml)。推送到 `main` 或手動觸發時，`mystic_tarot_static_export` 流程會自動安裝依賴、執行 Lint 與型別檢查，最後透過 `npm run build:app` 匯出靜態資產。
- 目前採用 `npm install`（非 `npm ci`）安裝依賴，方便在可連網環境解析 `@capacitor-community/admob` 等可選套件。
- 建置成功或失敗時會寄信通知 `highandhigh96@hotmail.com` 與 `fish760217@gmail.com`，可依需求修改 [`codemagic.yaml`](codemagic.yaml) 的 `publishing.email.recipients` 陣列。
- 新增或更新設定檔後，記得在 Codemagic 後台點選 **Check for configuration file** 重新載入設定，接著即可啟動建置與自動截圖流程。

## 📄 License

[MIT](LICENSE)
