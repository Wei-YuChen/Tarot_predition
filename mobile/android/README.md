# Android Shell Template

這個目錄包含 Capacitor Android 專案的基礎模板與同步腳本會輸出的成品。常用流程如下：

1. `npm run cap:patch`：建立/更新 `AndroidManifest.xml`、`strings.xml`、`MainActivity.kt` 等檔案，並確保 AdMob 權限與 App ID 齊全。
2. 第一次準備原生專案時，安裝 CLI 與平台套件：`npm install @capacitor/cli @capacitor/android --save-dev`。
3. `npm run cap:sync`：將 `apps/web/out` 的靜態檔案複製到原生專案並呼叫 Capacitor CLI。
4. 若環境尚未產生 `gradlew`，請在此目錄執行 `gradle wrapper --gradle-version 8.5` 以建立 Gradle Wrapper（需可存取 Maven Repository）。

完成後可透過 `npm run cap:open:android` 開啟 Android Studio 進行編譯與簽署。
