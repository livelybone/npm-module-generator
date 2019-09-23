# @livelybone/npm-module-generator
[![NPM Version](http://img.shields.io/npm/v/@livelybone/npm-module-generator.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/npm-module-generator)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/npm-module-generator.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/npm-module-generator)

[En Doc](./README.md)

一个用于创建 npm 包的脚手架

这个脚手架对 npm 包的初始化基于模板，欢迎提交 PR 创建更多模板.

已集成: 
1. 代码风格检查 (eslint + prettier)
2. 单元测试。这里有一个基础的测试文件： `./test/index.spec.js`
3. 已配置好的 rollup (项目初始化之后开箱即用，不用再担心 rollup 的配置问题)
4. Typescript 支持, `index.d.ts` 将在你运行 `npm run build:dts` 命令之后被生成
5. Demo 支持，你可以修改 Demo 或者源码，并通过运行命令 `cross-env PORT=3000 npm run dev` 实时的查看这些改动 
6. 集成 Vue/React 组件开发

## repository
https://github.com/livelybone/-livelybone-npm-module-generator.git

## Use
npx `Recommend`

```bash
npx @livelybone/npm-module-generator [projectName] [--template] [cmd]
```
> 如果您以前通过 `npm install -g @livelybone/npm-module-generator` 在全局范围内安装了 @livelybone/npm-module-generator，我们建议您使用 `npm uninstall -g @livelybone/npm-module-generator` 卸载软件包，以确保 npx 始终使用最新版本。

npm

```bash
# npm global install
npm i -g @livelybone/npm-module-generator

module-generator [projectName] [--template] [cmd]
```
> 这不能确保模块是最新的

> 创建一个 Vue 组件

```bash
npx @livelybone/npm-module-generator VueComponentName --vue
```

> 创建一个 Vue 组件，并使用 Typescript

```bash
npx @livelybone/npm-module-generator VueComponentName --vue-ts
```

> 创建一个 React 组件

```bash
npx @livelybone/npm-module-generator ReactComponentName --react
```

> 创建一个 React 组件，并使用 Typescript

```bash
npx @livelybone/npm-module-generator ReactComponentName --react-ts
```

> 创建一个 js 库

```bash
npx @livelybone/npm-module-generator ModuleName --js
```

> 创建一个 js 库，并使用 Typescript

```bash
npx @livelybone/npm-module-generator ModuleName --ts
```

> 查看 @livelybone/npm-module-generator 最新版本

```bash
npx @livelybone/npm-module-generator -v
```

## Options
|Argument|Default|Description|
|--------|-------|-----------|
|`projectName`|none|Optional. ProjectName, dirname|
|`template`|`js`|Optional. Chose template, options: `['js', 'vue', 'react', 'ts', 'vue-ts', 'react-ts']`|
|`cmd`|none|Optional. `-v` `--v` `-version` `--version` -> version |

## Params of initializer

> `project-name`: 库的名称（用于发布在 npm 上的名称）

> `description`: 库的描述

> `repository`: 库源代码地址

> `keywords`: 关键词

> `bugsUrl`: Bug 提交地址

> `author`: 作者（邮箱地址）

> `homepage`: 主页，用于详细展示你的库

> `module-name`: 当库被用 `umd` 方式导入在项目中时，向全局注册的变量名

## Module dev
使用命令 `cross-env PORT=3000 npm run dev` 来开发，每次修改之后刷新页面即可看到改动内容

## QA
1. 使用 `npm run dev`，编辑源代码之后看不到改动的内容
> 你可能需要打开 chrome dev-tool，并且将 disable cache 勾选上

2. 我生成的项目没有 `npm run build:dts` 命令，无法生成 `index.d.ts`
> `'js', 'vue', 'react'` 三个模板由于是 js 开发，暂不支持 index.d.ts 的生成，只能通过手动修改来更新 index.d.ts 文件
