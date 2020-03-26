<h1 align="center">Kotomi UI</h1>
<div align="center" style="padding-bottom: 30px;">基于Ant Design做的组件扩展，开发的一套组件库</div>

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e250572478fe40f18b4164d325c78176)](https://www.codacy.com/gh/Kotomi-Team/kotomi-ui?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Kotomi-Team/kotomi-ui&amp;utm_campaign=Badge_Grade) ![![npm](https://www.npmjs.com/package/kotomi-ui)](https://img.shields.io/npm/dw/kotomi-ui?label=npm) [![Netlify Status](https://api.netlify.com/api/v1/badges/a4a0f979-f445-4f4e-b259-537f1958afc0/deploy-status)](https://app.netlify.com/sites/unruffled-booth-152cbf/deploys)

## ✨ 特性

- ⚙️ 表格支持单元格和行编辑，并且很方便的进行远程分页加载数据。
- 🌈 语义话的表单定义，无需构建复杂的xml或者json格式。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- 🌍 使用storybook 包含大量例子

> Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.

## 🖥 支持环境

- 现代浏览器和 IE11 及以上。
- 支持服务端渲染。
- [Electron](http://electron.atom.io/)


## 📦 安装

### 使用npm 或者 yarn 进行安装

```bash
npm install kotomi-ui --save
```

```bash
yarn add kotomi-ui
```

### 浏览器引用

我们在 npm 发布包内的 kotomi-ui/dist 目录下提供了kotomi.bundle.js。你也可以通过 CDNJS， 或 UNPKG 进行下载。

```
<script src="//unpkg.com/kotomi-ui@latest/dist/kotomi.bundle.js"></script>
```


> 强烈不推荐使用已构建文件，这样无法按需加载，而且难以获得底层依赖模块的 bug 快速修复支持。注意：你需要自行引入 moment。