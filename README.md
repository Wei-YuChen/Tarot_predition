# 🔮 Mystic Tarot – Web 與 Capacitor 行動 App Monorepo

Mystic Tarot 提供完整的三張牌塔羅占卜體驗，採用 Next.js 14、TypeScript 與 Tailwind CSS 打造。此倉庫已擴充為單一 Monorepo，同時支援：

Mystic Tarot delivers a three-card tarot reading journey powered by Next.js 14, TypeScript, and Tailwind CSS. The monorepo hosts both web and Capacitor app targets in a single codebase so teams can ship consistently across platforms.

- **Web 版本 / Web target**：部署到 Vercel 或 Cloudflare，透過 Google AdSense 與 Taboola 提供展示型廣告。
- **行動 App 版本 / Capacitor apps**：以 Capacitor 打包 Android 與 iOS，整合 AdMob Banner、Interstitial 與 Rewarded。
- **一致體驗 / Unified experience**：同一份程式碼處理問題輸入、抽牌、基礎解析與 Rewarded 解鎖的 AI 深度解析。

![Mystic Tarot](https://img.shields.io/badge/Tarot-Mystical-purple?style=for-the-badge&logo=crystal&logoColor=gold)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ 核心功能 / Key Features

### 🎴 塔羅占卜體驗 Tarot Reading Experience
- **完整 78 張牌組**：涵蓋大阿爾克那與小阿爾克那，支援九種語系。  _Complete 78-card deck with localized titles across nine locales._
- **正逆位與位置解釋**：Past / Present / Future 三張牌搭配在地化含義。  _Past, Present, and Future placements include upright and reversed meanings per locale._
- **決定性隨機**：以 Seeded RNG 決定抽牌順序與正逆位，問題相同即可重現。  _Seeded RNG guarantees reproducible draws for the same question._
- **每日閱讀限制**：在地儲存每日三次的免費閱讀紀錄。  _Daily quota of three readings is enforced via local storage._

### 🌐 多平台廣告策略 Cross-platform Monetization
- `NEXT_PUBLIC_BUILD_TARGET=web`：渲染 `<WebAdsense />`，在結果頁注入 AdSense/Taboola 版位。  _Web builds show `<WebAdsense />` placements for AdSense/Taboola._
- `NEXT_PUBLIC_BUILD_TARGET=app`：渲染 `<MobileAdMob />` 並使用 `lib/admob.ts` 觸發 Interstitial 與 Rewarded。  _App builds use `<MobileAdMob />` with the AdMob plugin for interstitial and rewarded ads._
- **翻牌後插頁廣告**：行動版在完成抽牌動畫後顯示一次 Interstitial。  _An interstitial is displayed right after the reveal animation in mobile builds._
- **深度解析 Rewarded 門檻**：僅在 `showRewarded` 回傳成功後才呼叫 AI API。  _The deep analysis API is unlocked only after a rewarded ad grants a reward._
- **Banner 常駐頁底**：在結果頁底部維持 AdMob Banner，並於失敗時顯示本地化提示。  _A persistent AdMob banner anchors the bottom of the reading screen with localized fallbacks._

### 📱 Phase 3 行動強化 Mobile Enhancements
- **獎勵解鎖快取**：`lib/app-reading-storage.ts` 會儲存 Rewarded 成功狀態，離線也能存取深度解析。  _Reward completions are cached so offline users can reopen AI insights._
- **離線提示與快取顯示**：偵測 `navigator.onLine`，離線時顯示最近一次快取結果。  _Offline detection surfaces cached insights with clear messaging._
- **Banner 生命週期管理**：App 進入背景時隱藏 Banner，回到前景時重新顯示，避免殘留。  _Banner lifecycle gracefully handles background/foreground transitions._

---

## 🏗️ 專案結構 / Repository Layout

```
tarot-app/
├── apps/
│   └── web/                     # Next.js 14 App Router 專案 / Next.js app
│       ├── app/                 # 頁面、API Routes 與語系路徑 / Pages, API routes, i18n routes
│       ├── components/          # Web 專用元件 / Web-specific components
│       ├── lib/                 # 塔羅邏輯、i18n、儲存工具 / Tarot logic, i18n, storage helpers
│       ├── locales/             # JSON 語系資料 / Localized card data
│       ├── public/              # 靜態資源與 ads.txt / Static assets and ads.txt
│       ├── styles/              # Tailwind 與全域樣式 / Tailwind and global styles
│       ├── next.config.js
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       └── tsconfig.json
├── components/                  # Web/App 共用 React 元件 / Shared React components
│   ├── AdsSwitch.tsx            # 依 build target 切換廣告 / Target-aware ad switch
│   ├── MobileAdMob.tsx          # AdMob Banner 管理 / Banner lifecycle manager
│   └── WebAdsense.tsx           # AdSense 版位 / AdSense placement wrapper
├── lib/
│   ├── admob.ts                 # AdMob 插件封裝或 stub / AdMob bridge & stub fallback
│   ├── app-reading-storage.ts   # 行動端 Rewarded/解析快取工具 / Mobile reading cache helper
│   └── stubs/                   # 缺少原生套件時的替身實作 / Stubs when native plugin missing
├── mobile/                      # Capacitor 原生包殼 / Capacitor shell
│   ├── capacitor.config.ts
│   ├── ios/                     # Xcode 專案與樣板 / iOS project & templates
│   └── android/                 # Gradle 專案與樣板 / Android project & templates
├── scripts/apply-capacitor-platform-config.mjs
├── .env.web.local               # Web 目標環境變數範例 / Web env sample
├── .env.app.local               # App 目標環境變數範例 / App env sample
├── .env.example                 # 共用環境變數樣板 / Shared env template
└── package.json                 # 共用 scripts 與依賴 / Root scripts & deps
```

---

## 🚀 快速開始 / Getting Started

### 1. 安裝相依套件 Install Dependencies
```bash
npm install
```

### 2. Web 開發流程 Web Development
```bash
npm run dev            # 啟動 web 版開發伺服器 / start web dev server
npm run lint           # 執行 ESLint / lint
npm run type-check     # TypeScript 型別檢查 / type check
npm run build          # next build (web 版) / production build
npm run start          # next start (web 版) / production server
```

### 3. App 目標（Capacitor） App Target (Capacitor)
1. 建立 `.env.app.local` 並填入通用與 iOS/Android 的 AdMob 測試 ID。 _Create `.env.app.local` with shared + iOS/Android AdMob test IDs._
2. 建置與匯出靜態資源（`build:app` 會自動輸出 `apps/web/out`）： _Build and export static files for Capacitor._
   ```bash
   npm run build:app
   # npm run export 亦為別名，可於需要時重複執行 / alias for repeated exports
   ```
3. 套用原生設定並同步資源： _Patch native projects and copy assets._
   ```bash
   npm run cap:patch
   npm run cap:copy
   ```
4. 開啟原生專案進一步編譯： _Open native workspaces._
   ```bash
   npm run cap:open:ios
   npm run cap:open:android
   ```

> 初次開發請先執行 `npm run cap:patch`，確保 iOS/Android 皆寫入 AdMob App ID、ATT 說明與網路權限。  
> Run `npm run cap:patch` once before committing native projects so AdMob identifiers and permissions are injected idempotently.

---

## ⚙️ 環境變數 / Environment Variables

| 變數 | 說明 | Description |
| ---- | ---- | ----------- |
| `NEXT_PUBLIC_BUILD_TARGET` | `web` 或 `app`，控制 `<AdsSwitch />` 載入哪個廣告元件 | Selects `<WebAdsense />` or `<MobileAdMob />` |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | （選填）Web 版 AdSense client ID | Optional AdSense client for the web build |
| `NEXT_PUBLIC_ADSENSE_SLOT_ID` | （選填）Web 版 AdSense slot | Optional AdSense slot for the web build |
| `NEXT_PUBLIC_TABOOLA_PUBLISHER_ID` | （選填）Taboola Publisher ID | Optional Taboola publisher identifier |
| `NEXT_PUBLIC_ADMOB_BANNER_ID` | 通用 AdMob Banner 測試/正式 ID，亦作為平台專用 ID 的後備值 | Shared banner ad unit (fallback when platform-specific IDs are missing) |
| `NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID` | 通用 AdMob Interstitial 測試/正式 ID | Shared interstitial ad unit |
| `NEXT_PUBLIC_ADMOB_REWARDED_ID` | 通用 AdMob Rewarded 測試/正式 ID | Shared rewarded ad unit |
| `NEXT_PUBLIC_ADMOB_IOS_BANNER_ID` | iOS 專用 Banner 測試/正式 ID | iOS banner ad unit |
| `NEXT_PUBLIC_ADMOB_IOS_INTERSTITIAL_ID` | iOS 專用 Interstitial 測試/正式 ID | iOS interstitial ad unit |
| `NEXT_PUBLIC_ADMOB_IOS_REWARDED_ID` | iOS 專用 Rewarded 測試/正式 ID | iOS rewarded ad unit |
| `NEXT_PUBLIC_ADMOB_ANDROID_BANNER_ID` | Android 專用 Banner 測試/正式 ID | Android banner ad unit |
| `NEXT_PUBLIC_ADMOB_ANDROID_INTERSTITIAL_ID` | Android 專用 Interstitial 測試/正式 ID | Android interstitial ad unit |
| `NEXT_PUBLIC_ADMOB_ANDROID_REWARDED_ID` | Android 專用 Rewarded 測試/正式 ID | Android rewarded ad unit |
| `NEXT_PUBLIC_ADMOB_PLATFORM` | （選填）強制指定 app 廣告平台 `ios`/`android`，用於測試或模擬 | Optional override for ad platform detection (`ios`/`android`) |
| `OPENAI_API_KEY` | 深度解析使用的 OpenAI API 金鑰（無金鑰時會回退 demo 回覆） | OpenAI key for deep analysis (falls back to demo text) |

請將敏感值寫入 `.env.web.local` 或 `.env.app.local`，並保留 `.env.example` 作為文件樣板。  
Store secrets in target-specific env files; keep `.env.example` as documentation only.

---

## 📦 NPM Scripts / Tooling

| 指令 | 功能 | Description |
| ---- | ---- | ----------- |
| `npm run dev:web` / `npm run dev:app` | 以不同 build target 啟動開發伺服器 | Launch dev server with a chosen build target |
| `npm run build:web` / `npm run build:app` | 針對 Web/App 目標建置 Next.js 產物 | Build production bundles for web or app |
| `npm run export` | `build:app` 的別名，可重複產出 `apps/web/out` 靜態檔案 | Alias to regenerate static exports |
| `npm run lint` | 執行 ESLint | Run ESLint via `next lint` |
| `npm run format` | 使用 Prettier 格式化 | Format with Prettier |
| `npm run type-check` | TypeScript 型別檢查 | Run `tsc --noEmit` |
| `npm run test` | 編譯並執行 Node.js 單元測試 | Compile and execute Node.js unit tests |
| `npm run cap:patch` | 更新 iOS/Android 專案中的 AdMob/權限設定 | Apply native configuration patches |
| `npm run cap:copy` | 將 `apps/web/out` 靜態檔案複製到原生平台 | Copy static export into native projects |
| `npm run cap:open:ios` / `npm run cap:open:android` | 開啟 Xcode / Android Studio | Open native workspaces |
| `npm run release:verify` | 一次執行 lint、型別檢查、測試、Web/App 建置與靜態匯出 | Full CI pipeline before releases |

---

## 🧪 測試與品質 / Quality Gates

- `npm run lint`：確保程式碼符合 ESLint 規範。  _Enforces the Next.js ESLint profile._
- `npm run type-check`：強制 TypeScript 嚴格模式通過。  _Runs strict TypeScript checks._
- `npm run test`：驗證 `app-reading-storage` 在 Rewarded 解鎖、過期清理等情境的行為。  _Covers rewarded caching edge cases via Node test runner._
- `npm run release:verify`：整合所有檢查與建置流程，亦為 GitHub Actions CI 所採用的驗證腳本。  _Single command pipeline mirroring CI._

建議在送審或發版前皆執行上述檢查，並以 `release:verify` 作為最終把關。  
Always run `release:verify` before store submissions or production deploys.

---

## 🗺️ Roadmap（Phase 回顧） / Phase Recap

| Phase | 內容摘要 | Summary |
| ----- | -------- | ------- |
| Phase 0 | 調整為 Monorepo 結構 (`apps/web`)、新增 build target 旗標與環境檔樣板。 | Monorepo transition with build target flag & env templates. |
| Phase 1 | 建立 `<AdsSwitch>`、`<WebAdsense>`、`<MobileAdMob>`，串接 Interstitial/Rewarded 流程。 | Cross-platform ad abstraction and AdMob flow. |
| Phase 2 | 建立 `mobile/` Capacitor 原生包殼，提供 `scripts/apply-capacitor-platform-config.mjs` 自動補丁。 | Capacitor shell with automated native patches. |
| Phase 3 | App 離線快取、Rewarded 解鎖持久化、AdMob Banner 生命週期強化與測試覆蓋。 | Mobile offline cache & ad lifecycle hardening. |
| Phase 4 | 發布檢查表、`release:verify` 腳本與 GitHub Actions CI，自動化部署前驗證並整理 Web/Android/iOS 上架流程。 | Release checklist, unified verification script, and CI automation. |

---

## 📦 Phase 4 – 發布與營運準備 / Release & Operations

- `docs/RELEASE_CHECKLIST.md` 提供 Web、Android 與 iOS 的詳細上架步驟。  _Detailed launch checklist for all targets._
- `npm run release:verify` 串連 lint、型別檢查、單元測試、Web/App 建置與 `next export`。  _One-stop validation pipeline._
- `.github/workflows/ci.yml` 會在 Pull Request 與 `main` 分支自動執行上述驗證，並附帶產物供排錯。  _CI runs the same pipeline and uploads build artifacts for debugging._

### ☁️ Codemagic 雲端打包流程 / Codemagic Cloud Builds

- 倉庫根目錄新增 `codemagic.yaml`，定義 `android_release` 與 `ios_release` 兩個工作流程，自動執行 `npm run release:verify`、Capacitor 同步以及原生打包命令。 _`codemagic.yaml` hosts Android/iOS workflows that reuse the unified verification pipeline, Capacitor sync, and native packaging commands._
- 建議於 Codemagic 介面建立以下環境群組：
  - `android_keystore`：包含 `CM_KEYSTORE`（Base64 keystore）、`CM_KEYSTORE_PASSWORD`、`CM_KEY_ALIAS`、`CM_KEY_PASSWORD` 等欄位。 _Android keystore secrets for signing the AAB._
  - `ios_signing`：包含 `APPLE_TEAM_ID`、`CODE_SIGN_IDENTITY`、`PROVISIONING_PROFILE`、`EXPORT_METHOD`、`CM_CERTIFICATE`、`CM_CERTIFICATE_PASSWORD` 等欄位。 _Apple team, signing identity, provisioning profile and export method._
  - `admob_env`（選填）：可設定正式廣告 ID 或於 QA 期間覆寫測試 ID。 _Optional group to override AdMob identifiers per environment._
- `codemagic.yaml` 會自動將 `apps/web/out` 與原生產物上傳為 artifacts，並透過 `CM_EMAIL` 通知構建結果；若需要禁用 email，移除 `publishing.email` 區塊即可。 _Artifacts include the static export and native bundles; notifications rely on `CM_EMAIL`._
- 首次在新環境執行時，Codemagic 會自動 `npm install --no-save @capacitor/cli` 並執行 `npx cap add ios/android` 生成原生專案，無需手動介入。 _The workflow installs Capacitor CLI on the fly and generates missing native shells when necessary._

---

## 📱 原生設定摘要 / Native Configuration

### iOS
- `mobile/ios/App/App/Info.plist` 已加入 `GADApplicationIdentifier` 與 `NSUserTrackingUsageDescription`。  _Info.plist ships with AdMob App ID and ATT prompt copy._
- `PrivacyInfo.xcprivacy` 預填廣告資料存取資訊。  _Privacy manifest answers App Store privacy questionnaire._
- 透過 `npm run cap:patch` 可維持 Info.plist 與 Podfile 的冪等更新。  _`cap:patch` keeps Info.plist and Podfile synchronized._

### Android
- `mobile/android/app/src/main/AndroidManifest.xml` 宣告網路權限與 AdMob App ID meta-data。  _Manifest declares internet permission and AdMob App ID._
- `strings.xml` 預設寫入 Google 測試 App ID，可於發佈前改成正式值。  _Strings file stores the AdMob App ID (Google test value by default)._ 
- 所有修改均透過 `scripts/apply-capacitor-platform-config.mjs` 自動套用。  _Automated patch script prevents manual drift._

---

## 🚀 部署與發佈 / Deployment Checklist

- **Web**：
  - `npm run build:web`
  - 部署 `.next` 產物至 Vercel/Cloudflare，並確保 `.env.web.local` 中的廣告設定已轉換為正式 ID。  _Deploy to Vercel/Cloudflare with production ad slots._

- **Android**：
  - `npm run build:app`
  - `npm run cap:patch && npm run cap:copy`
  - 使用 `npm run cap:open:android` 打開 Android Studio，產出 AAB 檔後上傳 Google Play Console，並填寫 Data safety 表單。  _Generate an AAB and complete Data Safety._

- **iOS**：
  - 同步步驟與 Android 相同，最後透過 `npm run cap:open:ios` 開啟 Xcode、建立 Archive，於 App Store Connect 送審，並完成 App Privacy 問卷。  _Archive in Xcode and submit via App Store Connect, completing privacy questionnaires._

上架前請改用正式的廣告 ID 並再次執行所有測試與建置指令，確認 Rewarded 流程與離線快取皆正常。  
Before shipping, swap in production ad IDs and rerun the full verification pipeline.

---

## 🎨 自訂與延伸 / Customization & Extensibility

- **主題顏色 Theme Colors**：於 `apps/web/tailwind.config.js` 調整品牌色彩，打造專屬神秘感。  _Tweak the Tailwind palette for bespoke branding._
- **牌義資料 Card Data**：在 `apps/web/lib/tarot-i18n.ts` 與 `apps/web/locales/` 更新在地化描述或新增語系。  _Extend localized meanings or add locales._
- **Spread 與流程 Spreads & Flow**：`apps/web/app/[locale]/reading/page.tsx` 控制抽牌及解析流程，可加入更多關卡或動畫。  _Enhance reading logic with additional spreads or motions._

---

## 🤝 貢獻指南 / Contributing

1. Fork 本倉庫，建立功能分支並以 Conventional Commits 命名。  _Fork the repo and create feature branches with Conventional Commits._
2. 開發過程請執行 `npm run lint`、`npm run type-check` 與 `npm run test`。  _Keep lint, type checks, and tests green before pushing._
3. 送出 PR 時附上測試結果截圖或日誌，並參考 `.github/PR_TEMPLATE.md`。  _Follow the PR template with verification evidence._

---

## 📄 授權 / License

本專案依據 [MIT License](LICENSE) 授權。  _Licensed under the MIT License._

---

## 📧 支援 / Support

- 📧 Email: support@mystictarot.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/tarot-prediction/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/tarot-prediction/discussions)

---

_"The cards are a mirror reflecting the wisdom that already exists within you."_ 🔮✨
