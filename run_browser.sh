#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

# 参数: URL, 窗口标题, cookie文件路径
URL="$1"
TITLE="$2"
COOKIE_FILE="$3"

# 启动浏览器
python3 "$SCRIPT_DIR/browser.py" "$URL" "$TITLE" "$COOKIE_FILE"
