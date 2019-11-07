###!/usr/bin/env sh

### 确保脚本抛出遇到的错误
set -e

### 生成静态文件
npm run build-storybook

cd storybook-static/
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/majunchang/mi.vant.storybook.git master

cd -
