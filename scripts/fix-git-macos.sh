#!/usr/bin/env bash
# macOS：系统 /usr/bin/git 与 Homebrew 在安装/编译时都会检查 Xcode 许可。
# 在本机终端执行（会提示输入登录密码）：bash scripts/fix-git-macos.sh

set -euo pipefail

echo "==> 1/3 接受 Xcode / Command Line Tools 许可（需管理员密码）"
sudo xcodebuild -license accept

echo "==> 2/3 确认 git 可用"
/usr/bin/git --version

if command -v brew >/dev/null 2>&1; then
  echo "==> 3/3 安装/更新 Homebrew 版 Git（推荐，避免以后依赖系统 git）"
  brew install git || brew upgrade git || true
  echo ""
  echo "请将 Homebrew 放在 PATH 前面（Apple Silicon 常见路径）："
  echo '  echo '\''export PATH="/opt/homebrew/bin:$PATH"'\'' >> ~/.zshrc && source ~/.zshrc'
  echo "然后执行: which git   （应显示 /opt/homebrew/bin/git）"
else
  echo "未检测到 brew，跳过 Homebrew Git。系统 git 在许可通过后即可使用。"
fi

echo ""
echo "完成。可在本仓库执行: git status"
