#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage: scripts/verify-keystore.sh [options]

Options:
  -h, --help               顯示本說明並結束。
  --keystore-path <path>   直接使用本機已存在的 keystore 檔案。
  --output <path>          指定匯出 keystore 的路徑（當使用 Base64 環境變數時）。
  --base64-env <name>      包含 keystore Base64 的環境變數名稱（預設: CM_KEYSTORE）。
  --storepass-env <name>   包含 keystore store 密碼的環境變數名稱（預設: CM_KEYSTORE_PASSWORD）。
  --keypass-env <name>     包含 key 密碼的環境變數名稱（預設: CM_KEY_PASSWORD）。
  --alias-env <name>       包含目標 alias 的環境變數名稱（預設: CM_KEY_ALIAS）。

說明：
  - 若提供 --keystore-path，腳本會直接使用該檔案進行驗證。
  - 未提供 --keystore-path 時，腳本會從指定 Base64 環境變數還原 keystore，
    預設輸出至暫存檔。若同時指定 --output，會寫入該路徑並保留檔案。
  - 驗證會列出 keystore 內的 alias 清單，並以指定 alias 執行詳細檢查。
USAGE
}

fail() {
  echo "[verify-keystore] $1" >&2
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "找不到指令: $1"
}

KEYSTORE_PATH=""
OUTPUT_PATH=""
BASE64_ENV="CM_KEYSTORE"
STOREPASS_ENV="CM_KEYSTORE_PASSWORD"
KEYPASS_ENV="CM_KEY_PASSWORD"
ALIAS_ENV="CM_KEY_ALIAS"

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    --keystore-path)
      [[ $# -ge 2 ]] || fail "--keystore-path 需要參數"
      KEYSTORE_PATH="$2"
      shift 2
      ;;
    --output)
      [[ $# -ge 2 ]] || fail "--output 需要參數"
      OUTPUT_PATH="$2"
      shift 2
      ;;
    --base64-env)
      [[ $# -ge 2 ]] || fail "--base64-env 需要參數"
      BASE64_ENV="$2"
      shift 2
      ;;
    --storepass-env)
      [[ $# -ge 2 ]] || fail "--storepass-env 需要參數"
      STOREPASS_ENV="$2"
      shift 2
      ;;
    --keypass-env)
      [[ $# -ge 2 ]] || fail "--keypass-env 需要參數"
      KEYPASS_ENV="$2"
      shift 2
      ;;
    --alias-env)
      [[ $# -ge 2 ]] || fail "--alias-env 需要參數"
      ALIAS_ENV="$2"
      shift 2
      ;;
    *)
      fail "未知參數: $1"
      ;;
  esac
done

require_cmd keytool
require_cmd base64
require_cmd python3

TMP_FILE=""
cleanup() {
  if [[ -n "$TMP_FILE" && -f "$TMP_FILE" ]]; then
    rm -f "$TMP_FILE"
  fi
}
trap cleanup EXIT

if [[ -z "$KEYSTORE_PATH" ]]; then
  BASE64_VALUE="${!BASE64_ENV-}"
  [[ -n "$BASE64_VALUE" ]] || fail "環境變數 $BASE64_ENV 未設定"

  if [[ -n "$OUTPUT_PATH" ]]; then
    KEYSTORE_PATH="$OUTPUT_PATH"
  else
    TMP_FILE="$(mktemp)"
    KEYSTORE_PATH="$TMP_FILE"
  fi

  CLEANED=$(printf "%s" "$BASE64_VALUE" | tr -d ' \n\r\t')
  {
    printf "%s" "$CLEANED" | base64 -d 2>/dev/null || \
    printf "%s" "$CLEANED" | base64 --decode 2>/dev/null || \
    printf "%s" "$CLEANED" | base64 -D 2>/dev/null
  } >"$KEYSTORE_PATH" || fail "Base64 內容無法還原成 keystore"
fi

[[ -f "$KEYSTORE_PATH" ]] || fail "找不到 keystore 檔案: $KEYSTORE_PATH"

STOREPASS="${!STOREPASS_ENV-}"
KEYPASS="${!KEYPASS_ENV-}"
ALIAS="${!ALIAS_ENV-}"

[[ -n "$STOREPASS" ]] || fail "環境變數 $STOREPASS_ENV 未設定"
[[ -n "$KEYPASS" ]] || fail "環境變數 $KEYPASS_ENV 未設定"
[[ -n "$ALIAS" ]] || fail "環境變數 $ALIAS_ENV 未設定"

echo "== env summary =="
printf 'alias: [%s]\n' "$ALIAS"
printf 'storepass length: %d\n' "${#STOREPASS}"
printf 'keypass length: %d\n' "${#KEYPASS}"

# 列印基本資訊，方便比對
python3 - <<PYTHON
import hashlib, pathlib
path = pathlib.Path("$KEYSTORE_PATH")
data = path.read_bytes()
print("== keystore info ==")
print(f"path: {path}")
print(f"size: {len(data)} bytes")
print(f"sha256: {hashlib.sha256(data).hexdigest()}")
PYTHON

echo "== list aliases (storepass) =="
keytool -list -keystore "$KEYSTORE_PATH" -storepass "$STOREPASS"

echo "== open target alias (storepass + keypass) =="
keytool -list -v -keystore "$KEYSTORE_PATH" \
  -alias "$ALIAS" \
  -storepass "$STOREPASS" \
  -keypass "$KEYPASS"

echo "[verify-keystore] OK: alias + password 驗證通過"

