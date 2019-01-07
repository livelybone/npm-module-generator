# @livelybone/npm-module-generator
[![NPM Version](http://img.shields.io/npm/v/@livelybone/npm-module-generator.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/npm-module-generator)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/npm-module-generator.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/npm-module-generator)

A plugins for generating a framework of npm module, include directories and dependencies.

The module is based on template, welcome to add more templates.

## repository
https://github.com/livelybone/-livelybone-npm-module-generator.git

## Demo
https://github.com/livelybone/-livelybone-npm-module-generator#readme

## installation
```bash
npm i -g @livelybone/npm-module-generator
```

## Use
```bash
module-generator [projectName] [--template] [cmd]
```

## Options
|Argument|Default|Description|
|--------|-------|-----------|
|`projectName`|none|Optional. ProjectName, dirname|
|`template`|`js-plugin`|Optional. Chose template, options: `['vue-plugin', 'js-plugin']`|
|`cmd`|none|Optional. `-v` `--v` `-version` `--version` -> version |

## Params of initializer

> `project-name`: The name of the module 

> `description`: Description of the module 

> `repository`: Repository of the module 

> `keywords`: Keywords of the module 

> `bugsUrl`: Where to submit bugs of the module 

> `author`: Author of the module

> `homepage`: The url of the demo or homepage. We may prefer demo address 

> `module-name`: The variable the module exported in format `umd`

In the new template you created, you can custom the params and apply them