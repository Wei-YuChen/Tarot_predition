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
│   └── AdsSwitch.tsx        # Environment-aware ad renderer
├── lib/
│   └── admob.ts             # Capacitor AdMob placeholder wrappers
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

This Phase 0 refactor keeps the original web experience intact while preparing the codebase for Capacitor packaging and mobile-specific logic in subsequent phases.

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

After exporting, continue with Capacitor tooling (to be completed in later phases):
```bash
npx cap copy
npx cap open ios
npx cap open android
```

### Environment configuration

- `.env.web.local` – prefilled with `NEXT_PUBLIC_BUILD_TARGET=web` and an AdSense placeholder.
- `.env.app.local` – prefilled with `NEXT_PUBLIC_BUILD_TARGET=app` and Google-provided AdMob **test IDs**.
- `.env.example` – consolidated template for CI/onboarding. Copy it when provisioning new environments.

Load the appropriate file before building or deploy via your hosting provider's dashboard.

## 🎯 Core Functionality Overview

The core tarot experience remains unchanged from the original implementation:

1. **Localized landing page** invites users to start a reading.
2. **Seeded deck shuffle** produces a reproducible three-card spread.
3. **Interpretation engine** merges localized card meanings, orientations, and contextual copy.
4. **Deep analysis endpoint** (`/api/deep-analysis`) integrates with OpenAI and gracefully falls back to demo text when no API key is configured.

All modules now live under `apps/web` so they can later be imported into shared utilities or mobile facades without conflicting with Capacitor scaffolding.

## 🧭 Next Steps (Beyond Phase 0)

1. **Phase 1 – Advertisement abstraction**: introduce `<WebAdsense />`, `<MobileAdMob />`, and wire `AdsSwitch` into the reading flow with proper Rewarded gating.
2. **Phase 2 – Capacitor shell**: initialize native projects, configure permissions, and sync exported assets.
3. **Phase 3 – Mobile UX polish**: handle offline storage, rewarded flows, and native-only affordances.
4. **Phase 4 – Release readiness**: document deployment, store submissions, and privacy questionnaires.

Each phase will build upon the monorepo foundation established here.

## 📝 Scripts Reference

| Script | Description |
| --- | --- |
| `npm run dev:web` | Start Next.js dev server for the web target |
| `npm run dev:app` | Start dev server with `NEXT_PUBLIC_BUILD_TARGET=app` |
| `npm run build:web` | Production build for web deployments |
| `npm run build:app` | Production build for Capacitor export |
| `npm run start` | Run the built web bundle locally |
| `npm run export` | Static export to `apps/web/out` for Capacitor |
| `npm run lint` | ESLint (`apps/web`) |
| `npm run format` | Prettier formatting |
| `npm run type-check` | TypeScript project check |

## 📄 License

[MIT](LICENSE)
