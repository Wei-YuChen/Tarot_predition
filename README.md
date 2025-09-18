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

### 📱 Phase 3 Mobile Enhancements

- **Reward unlock state is cached locally**, so once a user watches the rewarded ad the deep analysis flow stays open—even offline.
- **Deep analysis responses are stored per spread**, allowing the app shell to surface the latest interpretation when the network is unavailable or the API fails.
- **Offline detection with localized messaging** guides users when connectivity drops and highlights when cached insights are shown.
- **AdMob banners resume gracefully** after backgrounding the app, ensuring consistent monetization without duplicate banners.

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
│   ├── capacitor.config.ts  # Capacitor shell configuration + plugin defaults
│   ├── ios/
│   │   ├── App/             # Native shell (Info.plist, Privacy manifest, Podfile)
│   │   └── templates/       # Idempotent templates applied by scripts
│   └── android/
│       ├── app/             # Gradle module scaffold with manifest/strings/Activity
│       └── templates/       # Source templates consumed by scripts
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
npm run build:app
npm run export        # outputs to apps/web/out
```

After exporting, patch the native manifests and copy assets into the Capacitor shells:

```bash
npm run cap:patch     # scaffold Info.plist / AndroidManifest templates
npm run cap:sync      # export -> copy -> keep native projects in sync
```

> ℹ️ The sync script expects the Capacitor CLI and native packages to be installed. Run `npm install @capacitor/cli @capacitor/android @capacitor/ios --save-dev` before your first native build. These packages remain optional for pure web deployments.

Once synced, open the native workspaces to continue with platform-specific build tooling:

```bash
npm run cap:open:ios
npm run cap:open:android
```

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
- ✅ **Phase 2 – Capacitor shell**: scaffold Android/iOS projects, inject AdMob permissions/manifests, and provide repeatable sync scripts.
- ✅ **Phase 3 – Mobile UX polish**: persist rewarded unlocks offline, cache deep analysis results, and enhance banner lifecycle within the Capacitor shell.
- 🔜 **Phase 4 – Release readiness**: document deployment, store submissions, and privacy questionnaires.

Each phase builds upon the monorepo foundation established in Phase 0.

## 📝 Scripts Reference

| Script               | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `npm run dev:web`    | Start Next.js dev server for the web target          |
| `npm run dev:app`    | Start dev server with `NEXT_PUBLIC_BUILD_TARGET=app` |
| `npm run build:web`  | Production build for web deployments                 |
| `npm run build:app`  | Production build for Capacitor export                |
| `npm run start`      | Run the built web bundle locally                     |
| `npm run export`     | Static export to `apps/web/out` for Capacitor        |
| `npm run lint`       | ESLint (`apps/web`)                                  |
| `npm run format`     | Prettier formatting                                  |
| `npm run type-check` | TypeScript project check                             |
| `npm run test`       | Compile shared modules and run Node.js unit tests    |
| `npm run cap:patch`  | Ensure native manifests/Podfile contain AdMob config |
| `npm run cap:sync`   | Export + copy assets into Capacitor shells           |
| `npm run cap:open:ios` | Open the iOS Xcode workspace                       |
| `npm run cap:open:android` | Open Android Studio project                    |

## 📄 License

[MIT](LICENSE)
