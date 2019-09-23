# @livelybone/npm-module-generator
[![NPM Version](http://img.shields.io/npm/v/@livelybone/npm-module-generator.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/npm-module-generator)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/npm-module-generator.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/npm-module-generator)

[中文文档](./README-CN.md)

A scaffolding for generating a framework of npm module.

The module is based on template, welcome to add more templates.

Integrated: 
1. Code lint (eslint + prettier)
2. Unit test support, there is a basic test file `./test/index.spec.js`
3. Rollup configured (So you don't worry about the code compiling)
4. Typescript support, `index.d.ts` will be generate by run command `npm run build:dts`
5. Demo support, you can modify it or src code and see the changes in real time by running command `cross-env PORT=3000 npm run dev`
6. Vue/React component development support

## repository
https://github.com/livelybone/-livelybone-npm-module-generator.git

## Use
npx `Recommend`

```bash
npx @livelybone/npm-module-generator [projectName] [--template] [cmd]
```
> If you've previously installed @livelybone/npm-module-generator globally via `npm install -g @livelybone/npm-module-generator`, we recommend you uninstall the package using `npm uninstall -g @livelybone/npm-module-generator` to ensure that npx always uses the latest version.

npm

```bash
# npm global install
npm i -g @livelybone/npm-module-generator

module-generator [projectName] [--template] [cmd]
```
> This can not ensure that the module is up to date

> Create a Vue component

```bash 
npx @livelybone/npm-module-generator VueComponentName --vue
```

> Create a Vue component with typescript

```bash 
npx @livelybone/npm-module-generator VueComponentName --vue-ts
```

> Create a React component/library

```bash 
npx @livelybone/npm-module-generator ReactComponentName --react
```

> Create a React component/library with typescript

```bash 
npx @livelybone/npm-module-generator ReactComponentName --react-ts
```

> Create a js module/library

```bash 
npx @livelybone/npm-module-generator ModuleName --js
```

> Create a js module/library with typescript

```bash 
npx @livelybone/npm-module-generator ModuleName --ts
```

> See the version

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

> `project-name`: The name of the module will be used in npm

> `description`: Description of the module 

> `repository`: Repository of the module 

> `keywords`: Keywords of the module 

> `bugsUrl`: Where to submit bugs of the module

> `author`: Author of the module

> `homepage`: The url of the demo or homepage. We may prefer demo address 

> `module-name`: The variable the module exported in format `umd`

## Module dev
Use the command `npm run dev` in the module you generated to develop it，you can see the changes by refreshing the demo page

## QA
1. I modified the source code, but never see the changes in the demo page in running `npm run dev`
> Maybe you should open the chrome dev-tool，and check `Disable cache` option

2. The module I generated has no command `npm run build:dts`, so I cannot generate `index.d.ts`
> The three templates `'js', 'vue', 'react'` do not support for generating `index.d.ts` temporarily，please update you `index.d.ts` file manually
