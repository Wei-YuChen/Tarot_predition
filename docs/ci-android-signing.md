# Codemagic Android 簽章設定指南

本文件說明 Codemagic 在建置 Android 釋出套件時所需的環境變數、除錯步驟與常見錯誤排除，協助快速定位「Cannot recover key」等簽章問題。

## 必備環境變數

| 變數名稱 | 來源 | 說明 |
| --- | --- | --- |
| `CM_KEYSTORE` | Codemagic 秘密變數 | 以 Base64 編碼的 keystore 內容。允許 JKS 或 PKCS12。 |
| `CM_KEYSTORE_PASSWORD` | Codemagic 秘密變數 | keystore 的 store password。 |
| `CM_KEY_PASSWORD` | Codemagic 秘密變數 | 指定別名的 key password。 |
| `CM_KEY_ALIAS` | Codemagic 秘密變數 | keystore 內的 alias（預設 `upload`）。 |
| `CM_KEYSTORE_TYPE` (選填) | Codemagic 秘密變數 | keystore 類型。未設定時會自動嘗試 `JKS`/`PKCS12`；若使用 PKCS12 請明確設為 `PKCS12`。 |

> **安全提醒**：切勿將任何密碼、keystore 或 Base64 內容提交進版本庫。請只在 Codemagic UI 設定以上變數。

## CI 防呆檢查

`codemagic.yaml` 內的 Android workflow 會在簽章前執行下列檢查，確保失敗可早期發現：

1. **變數完整性檢查**：缺少任一必要變數會立即終止並顯示明確錯誤訊息。
2. **Base64 解碼**：會移除字串中的空白/換行，使用多種 `base64` 參數嘗試解碼。若仍失敗，會顯示 `failed to decode CM_KEYSTORE`。
3. **檔案雜湊**：輸出 keystore 檔案大小與 SHA-256，方便比對是否上傳正確。
4. **自動偵測 keystore 類型**：若未設定 `CM_KEYSTORE_TYPE`，會依序嘗試 `JKS`、`PKCS12`，並將結果寫入 `android/app/keystore.storetype` 與環境變數 `CM_DETECTED_KEYSTORE_TYPE` 供後續步驟與 Gradle 使用。
5. **別名與密碼驗證**：
   - `keytool -list` 使用 store password 驗證 keystore，可偵測 storepass 或 keystore 類型錯誤。
   - `keytool -list -v -alias ...` 確認 alias 存在並能讀取公開憑證。
   - `keytool -importkeystore` 會嘗試把指定 alias 匯出到暫存 PKCS12，確保 storepass 與 keypass 同時正確；若失敗將輸出 `alias/password mismatch`。

所有步驟均不會輸出明碼，只顯示長度或雜湊資訊。

## 常見錯誤對照表

| 訊息 | 可能原因 | 建議處理 |
| --- | --- | --- |
| `ERROR: missing required env var ...` | Codemagic 未設置對應變數 | 到 Codemagic UI -> Application -> Environment variables 新增。 |
| `ERROR: failed to decode CM_KEYSTORE (check base64)` | Base64 內容損壞或有多餘空白 | 重新從本機 keystore 產生 Base64：`base64 < upload-keystore.keystore`，貼上前確認無額外空白。 |
| `ERROR: decoded keystore is empty...` | Base64 內容無效或未成功複製 | 確認 Codemagic 變數內容與本機檔案大小一致後重新上傳。 |
| `ERROR: failed to list aliases...` | store password 錯誤或 keystore 類型錯誤 | 確認 `CM_KEYSTORE_PASSWORD`，若為 PKCS12 請設定 `CM_KEYSTORE_TYPE=PKCS12`。 |
| `ERROR: alias lookup failed...` | alias 或 store password 錯誤、keystore 類型不符 | 確認 `CM_KEY_ALIAS` 與 `CM_KEYSTORE_PASSWORD`，必要時設定 `CM_KEYSTORE_TYPE`。 |
| `ERROR: alias/password mismatch...` | key password 不正確，或 keystore 內的 key 與 store 密碼不一致 | 依錯誤訊息檢視 CI 列印的 `keytool output`（已遮蔽密碼），於本機執行 `keytool -importkeystore` 重新測試；若為 PKCS12 請確認 keypass = storepass。 |
| `ERROR: unable to determine keystore type...` | keystore 類型非 JKS/PKCS12，或 store password 錯誤 | 手動確認 keystore 類型，於 Codemagic 設定 `CM_KEYSTORE_TYPE`。 |
| Gradle 任務 `:app:signReleaseBundle` 報 `Cannot recover key` | alias / key password 錯誤，或 keystore 格式不符 | 依上表修正環境變數，或轉換 keystore 類型；確認 `keystore.storetype` 內容與實際一致。 |

## keystore 類型建議

若在 Codemagic 上持續出現 `Cannot recover key`，但本機使用 `keytool -list` 一切正常，可嘗試將 keystore 轉成 PKCS12：

```bash
keytool -importkeystore \
  -srckeystore upload-key.jks -srcstoretype JKS \
  -destkeystore upload-key.p12 -deststoretype PKCS12 \
  -srcalias upload
```

再將 `upload-key.p12` 以 `base64` 重新編碼並更新 `CM_KEYSTORE`，同時在 Codemagic 設定 `CM_KEYSTORE_TYPE=PKCS12`。

## 手動除錯技巧

1. 於本機使用與 CI 相同的密碼/alias 執行：
   ```bash
   keytool -list -v -keystore upload-keystore.keystore \
     -alias upload -storepass <storepass> -keypass <keypass> \
     -storetype JKS
   ```
2. 若 keystore 有多個 alias，可透過 `keytool -list -keystore ...` 查看，確保 `CM_KEY_ALIAS` 指向正確。
3. 調整變數後重新觸發 Codemagic workflow，檢查前述 debug 輸出是否符合預期。

## 產出物

成功建置後，簽章完成的 AAB 檔案位於：

- `android/app/build/outputs/bundle/release/app-release.aab`

可於 Codemagic 的 Artifacts 區段下載。
