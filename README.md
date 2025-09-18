# 🔮 Mystic Tarot – Web 與 Capacitor 行動 App Monorepo

Mystic Tarot 提供完整的三張牌塔羅占卜體驗，採用 Next.js 14、TypeScript 與 Tailwind CSS 打造。此倉庫已擴充為單一 Monorepo，同時支援：

- **Web 版本**：部署到 Vercel/Cloudflare，透過 Google AdSense 與 Taboola 投放展示型廣告。
- **行動 App 版本**：使用 Capacitor 打包成 Android 與 iOS 原生應用程式，並整合 AdMob（Banner、Interstitial、Rewarded）。

無論在瀏覽器或行動裝置，使用者皆能輸入問題、抽牌、閱讀基礎解析，並在觀看 Rewarded 廣告後取得 AI 深度解析。離線時會顯示快取內容，確保體驗不中斷。

![Mystic Tarot](https://img.shields.io/badge/Tarot-Mystical-purple?style=for-the-badge&logo=crystal&logoColor=gold)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ 核心功能

### 🎴 塔羅占卜體驗
- **完整 78 張牌組**：涵蓋大阿爾克那與小阿爾克那，支援九種語系。
- **正逆位與位置解釋**：Past / Present / Future 三張牌搭配在地化含義。
- **決定性隨機**：以 Seeded RNG 決定抽牌順序與正逆位，問題相同即可重現。
- **每日閱讀限制**：在地儲存每日三次的免費閱讀紀錄。

### 🌐 多平台廣告策略
- `NEXT_PUBLIC_BUILD_TARGET=web`：渲染 `<WebAdsense />`，在結果頁注入 AdSense/Taboola 版位。
- `NEXT_PUBLIC_BUILD_TARGET=app`：渲染 `<MobileAdMob />` 並使用 `lib/admob.ts` 觸發 Interstitial 與 Rewarded。
- **翻牌後插頁廣告**：行動版在完成抽牌動畫後顯示一次 Interstitial。
- **深度解析 Rewarded 門檻**：僅在 `showRewarded` 回傳成功後才呼叫 AI API。
- **Banner 常駐頁底**：在結果頁底部維持 AdMob Banner，並於失敗時顯示本地化提示。

### 📱 Phase 3 行動強化
- **獎勵解鎖快取**：`lib/app-reading-storage.ts` 會儲存 Rewarded 成功狀態，離線也能存取深度解析。
- **離線提示與快取顯示**：偵測 `navigator.onLine`，離線時顯示最近一次快取結果。
- **Banner 生命週期管理**：App 進入背景時隱藏 Banner，回到前景時重新顯示，避免殘留。

---

## 🏗️ 專案結構

```
tarot-app/
├── apps/
│   └── web/                     # Next.js 14 App Router 專案
│       ├── app/                 # 頁面、API Routes 與語系路徑
│       ├── components/          # Web 專用元件
│       ├── lib/                 # 塔羅邏輯、i18n、儲存工具
│       ├── locales/             # JSON 語系資料
│       ├── public/              # 靜態資源與 ads.txt
│       ├── styles/              # Tailwind 與全域樣式
│       ├── next.config.js
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       └── tsconfig.json
├── components/                  # Web/App 共用的 React 元件
│   ├── AdsSwitch.tsx            # 依 build target 切換廣告
│   ├── MobileAdMob.tsx          # AdMob Banner 管理
│   └── WebAdsense.tsx           # AdSense 版位
├── lib/
│   ├── admob.ts                 # AdMob 插件封裝或 stub
│   ├── app-reading-storage.ts   # 行動端 Rewarded/解析快取工具
│   └── stubs/                   # 缺少原生套件時的替身實作
├── mobile/                      # Capacitor 原生包殼
│   ├── capacitor.config.ts
│   ├── ios/                     # Xcode 專案與樣板
│   └── android/                 # Gradle 專案與樣板
├── scripts/apply-capacitor-platform-config.mjs
├── .env.web.local               # Web 目標環境變數範例
├── .env.app.local               # App 目標環境變數範例
├── .env.example                 # 共用環境變數樣板
└── package.json                 # 共用 scripts 與依賴
```

---

## 🚀 快速開始

### 1. 安裝相依套件
```bash
npm install
```

### 2. Web 開發流程
```bash
npm run dev            # 啟動 web 版開發伺服器 (NEXT_PUBLIC_BUILD_TARGET=web)
npm run lint           # 執行 ESLint
npm run type-check     # TypeScript 型別檢查
npm run build          # next build (web 版)
npm run start          # next start (web 版)
```

### 3. App 目標（Capacitor）
1. 建立 `.env.app.local` 並填入 AdMob 測試 ID（範例已提供 Google 測試值）。
2. 建置與匯出靜態資源：
   ```bash
   npm run build:app
   npm run export
   ```
3. 套用原生設定並同步資源：
   ```bash
   npm run cap:patch   # 套用 Info.plist、AndroidManifest 等補丁
   npm run cap:copy    # 複製最新 Web 資源到原生專案
   ```
4. 開啟原生專案進一步編譯：
   ```bash
   npm run cap:open:ios
   npm run cap:open:android
   ```

> 初次開發請先執行 `npm run cap:patch`，確保 iOS/Android 皆寫入 AdMob App ID、ATT 說明與網路權限。

---

## ⚙️ 環境變數

| 變數 | 說明 |
| ---- | ---- |
| `NEXT_PUBLIC_BUILD_TARGET` | `web` 或 `app`，控制 `<AdsSwitch />` 載入哪個廣告元件 |
| `NEXT_PUBLIC_ADSENSE_SLOT_ID` |（選填）Web 版 AdSense slot |
| `NEXT_PUBLIC_TABOOLA_PUBLISHER_ID` |（選填）Taboola Publisher ID |
| `NEXT_PUBLIC_ADMOB_BANNER_ID` | AdMob Banner 測試/正式 ID |
| `NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID` | AdMob Interstitial 測試/正式 ID |
| `NEXT_PUBLIC_ADMOB_REWARDED_ID` | AdMob Rewarded 測試/正式 ID |
| `OPENAI_API_KEY` | 深度解析使用的 OpenAI API 金鑰（無金鑰時會回退 demo 回覆） |

請將敏感值寫入 `.env.web.local` 或 `.env.app.local`，並保留 `.env.example` 作為文件樣板。

---

## 📦 NPM Scripts

| 指令 | 功能 |
| ---- | ---- |
| `npm run dev:web` / `npm run dev:app` | 以不同 build target 啟動開發伺服器 |
| `npm run build:web` / `npm run build:app` | 針對 Web/App 目標建置 Next.js 產物 |
| `npm run export` | 將 App 目標匯出成靜態檔案供 Capacitor 使用 |
| `npm run lint` | 執行 ESLint |
| `npm run format` | 使用 Prettier 格式化 |
| `npm run type-check` | TypeScript 型別檢查（使用 `apps/web/tsconfig.json`） |
| `npm run test` | 編譯並執行 Node.js 單元測試（離線快取邏輯） |
| `npm run cap:patch` | 更新 iOS/Android 專案中的 AdMob/權限設定 |
| `npm run cap:copy` | 將 `apps/web/out` 靜態檔案複製到原生平台 |
| `npm run cap:open:ios` / `npm run cap:open:android` | 開啟 Xcode / Android Studio |

---

## 🧪 測試與品質
- `npm run lint`：確保程式碼符合 ESLint 規範。
- `npm run type-check`：強制 TypeScript 嚴格模式通過。
- `npm run test`：驗證 `app-reading-storage` 在 Rewarded 解鎖、過期清理等情境的行為。

> 建議在送審或發版前皆執行上述三項檢查。

---

## 🗺️ Roadmap（Phase 回顧）

| Phase | 內容摘要 |
| ----- | -------- |
| Phase 0 | 調整為 Monorepo 結構 (`apps/web`)、新增 build target 旗標與環境檔樣板。 |
| Phase 1 | 建立 `<AdsSwitch>`、`<WebAdsense>`、`<MobileAdMob>`，串接 Interstitial/Rewarded 流程。 |
| Phase 2 | 建立 `mobile/` Capacitor 原生包殼，提供 `scripts/apply-capacitor-platform-config.mjs` 自動補丁。 |
| Phase 3 | App 離線快取、Rewarded 解鎖持久化、AdMob Banner 生命週期強化與測試覆蓋。 |

後續 Phase 4 計畫整合發佈流程（Vercel、Google Play、App Store）與營運文件。

---

## 📱 原生設定摘要

### iOS
- `mobile/ios/App/App/Info.plist` 已加入 `GADApplicationIdentifier` 與 `NSUserTrackingUsageDescription`。
- `PrivacyInfo.xcprivacy` 針對廣告資料存取提供預填資訊。
- 透過 `npm run cap:patch` 可維持 Info.plist 與 Podfile 的冪等更新。

### Android
- `mobile/android/app/src/main/AndroidManifest.xml` 已宣告網路權限與 AdMob App ID meta-data。
- `strings.xml` 預設寫入 Google 測試 App ID，可於發佈前改成正式值。
- 所有修改均透過 `scripts/apply-capacitor-platform-config.mjs` 自動套用，避免手動編輯造成衝突。

---

## 🚀 部署與發佈

- **Web**：
  - `NEXT_PUBLIC_BUILD_TARGET=web npm run build`
  - 部署 `.next` 產物至 Vercel/Cloudflare，並確保 `.env.web.local` 中的廣告設定已轉換為正式 ID。

- **Android**：
  - `NEXT_PUBLIC_BUILD_TARGET=app npm run build && npm run export`
  - `npm run cap:patch && npm run cap:copy`
  - 使用 `npm run cap:open:android` 打開 Android Studio，產出 AAB 檔後上傳 Google Play Console，並填寫 Data safety 表單。

- **iOS**：
  - 同步步驟與 Android 相同，最後透過 `npm run cap:open:ios` 開啟 Xcode、建立 Archive，於 App Store Connect 送審，並完成 App Privacy 問卷。

上架前請改用正式的廣告 ID 並再次執行所有測試與建置指令，確認 Rewarded 流程與離線快取皆正常。

---

如需更多細節或故障排除，可參考 `scripts/apply-capacitor-platform-config.mjs` 及 `lib/app-reading-storage.ts` 內的註解，了解補丁策略與離線儲存實作。
