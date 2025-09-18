# iOS Shell Notes

- 執行 `npm run cap:patch` 會建立 `App/App/Info.plist`、`PrivacyInfo.xcprivacy` 與 `Podfile`，並確保 AdMob 測試 App ID 與追蹤權限皆已填入。
- 第一次準備原生專案時，安裝 CLI 與 iOS 平台套件：`npm install @capacitor/cli @capacitor/ios --save-dev`，接著執行 `npm run cap:sync`。
- `npm run cap:open:ios` 會呼叫 `npx cap open ios`，在 macOS 環境下會打開 Xcode 專案；若使用者尚未安裝 CocoaPods，請先執行 `sudo gem install cocoapods && pod install` 於 `mobile/ios/App` 目錄。
- App Store 隱私需求已以 `PrivacyInfo.xcprivacy` 提供最小化樣板，正式上架時請再依產品狀況補齊問卷。
