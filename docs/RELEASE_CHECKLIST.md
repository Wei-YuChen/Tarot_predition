# Phase 4 – 發布與營運準備檢查表

此檢查表整理 Web、Android 與 iOS 三個管道的發布步驟，並強調必要的驗證腳本、廣告測試 ID、商店審核文件與版本後續維運重點。依序完成下列項目即可確保 Mystic Tarot 在多平台的上架品質一致。

---

## 1. 通用前置作業

- [ ] 於 `main`（或欲發布的候選分支）執行 `npm ci` 更新依賴。
- [ ] 執行 `npm run release:verify`，確保 lint、型別檢查、單元測試、Web/App 建置與靜態匯出皆通過。
- [ ] 確認 `.env.web.local`、`.env.app.local` 已填入正式廣告 ID 與 `OPENAI_API_KEY`；若仍使用測試值，上架前必須替換。
- [ ] 重新跑 `npm run cap:patch` 套用最新的原生權限與 AdMob App ID，避免遺漏。
- [ ] 於 README 的「部署與發佈」章節核對當前版本是否有新增注意事項，必要時更新文檔。
- [ ] 若使用 Codemagic，確認已於 Codemagic 建立 `android_keystore`、`ios_signing`、`admob_env` 等環境群組，並在 `codemagic.yaml` 中套用正確的團隊資訊與簽章參數。

---

## 2. Web（Vercel／Cloudflare）

1. `npm run build:web` → 確保 `.next` 產物生成成功。
2. `npm run start` 於本機驗證主要互動：抽牌動畫、Rewarded 前導提示、深度解析 API。
3. 於 staging（或 preview URL）確認：
   - AdSense / Taboola slot 掛載成功（需使用測試 ID）。
   - Web Vitals（LCP/CLS/FID）無明顯退化。
4. 上傳 `.next` 至 Vercel（或其他平台），並同步更新環境變數。
5. 部署完成後於真實裝置再測一次流程與廣告行為。

---

## 3. Android（Google Play Console）

1. `npm run release:verify` → 確認 Web/App 建置都通過後再進行。
2. `npm run build:app`（或 `npm run export`）→ 產出 `apps/web/out` 靜態資源。
3. `npm run cap:copy` → 同步最新檔案到 `mobile/android` 專案。
4. 在 Android Studio：
   - 使用 `Build > Generate Signed Bundle/APK` 建立 `.aab`。
   - 驗證 `AndroidManifest.xml` 內的 AdMob App ID 與權限無誤。
5. Google Play Console：
   - 上傳 `.aab` 至 Production / Internal Testing。
   - 更新 Data safety 表單與宣告廣告使用。
   - 上傳隱私權政策網址與最新截圖。
6. 審核通過後，監控 Play Console Crashlytics（若整合）與使用者回報。

---

## 4. iOS（App Store Connect）

1. 重複前述的 `npm run release:verify`、`npm run build:app`（或 `npm run export`）、`npm run cap:copy`。
2. `npm run cap:open:ios` → 以 Xcode 開啟專案並設定正確的 Bundle Identifier、簽章與版本號。
3. 確認 `Info.plist` 內：
   - `GADApplicationIdentifier` 已替換為正式 ID。
   - `NSUserTrackingUsageDescription` 說明符合審核要求。
4. `Product > Archive` 建立 build，透過 Organizer 上傳至 App Store Connect。
5. App Store Connect：
   - 填寫 App Privacy 問卷與第三方資料蒐集聲明。
   - 附上審核帳號、廣告測試說明文件。
   - 送審前於 TestFlight 測試 Rewarded 廣告與深度解析流程。
6. 審核通過後安排上架時間並通知營運。

---

## 5. 上架後監控與維運

- [ ] 使用 Sentry／Logflare 等既有監控追蹤錯誤堆疊與 API 延遲。
- [ ] 定期檢查廣告填充率，必要時更新備援文案或降低 Rewarded 門檻。
- [ ] 追蹤商店評價與回饋，蒐集下一版 Roadmap 需求。
- [ ] 更新 CHANGELOG 或釋出說明頁，保留審核提交的歷程紀錄。

此檢查表可依實際情況擴充，建議於每次發布後回填執行日期與負責人，利於營運稽核。
