const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const invalidChar = ['', '\u001b']

function getGeneratorTypes() {
  return fs.readdirSync(path.resolve(__dirname, './configs')).map(filename => {
    const name = filename.replace('.conf.js', '')
    return {
      name,
      path: path.resolve(__dirname, './configs', filename),
      template: path.resolve(__dirname, './templates', name),
    }
  })
}

function arrayFlat(arr) {
  return arr.reduce(
    (pre, ele) =>
      ele instanceof Array ? pre.concat(arrayFlat(ele)) : pre.concat(ele),
    [],
  )
}

function resolve(...urls) {
  return path.resolve(...urls)
}

function dirFlat(dirname) {
  return fs.readdirSync(dirname).reduce((pre, ele) => {
    const dir = resolve(dirname, ele)
    return fs.statSync(dir).isDirectory()
      ? pre.concat(dirFlat(dir))
      : pre.concat(dir)
  }, [])
}

function getFile(req, url) {
  return req(url)
}

function mkDir(pathname) {
  const dirname = path.dirname(pathname)
  if (!fs.existsSync(dirname)) {
    if (!fs.existsSync(path.dirname(dirname))) {
      mkDir(dirname)
    }
    fs.mkdirSync(dirname)
  }
}

function dealArgs(generatorTypes) {
  const args = process.argv.slice(2)

  const reg = {
    valid: /[a-zA-Z0-9@_\-.]*/,
    version: /^(-?-v|-?-version)$/,
    generatorType: /^--/,
  }

  if (args.some(arg => !reg.valid.test(arg))) {
    throw new Error('Invalid arguments: process.argv')
  }

  const cmd = args.find(arg => reg.version.test(arg))
  if (cmd) {
    return { cmd }
  }

  const args1 = args
    .filter(arg => reg.generatorType.test(arg))
    .map(arg => arg.replace(reg.generatorType, ''))
  const generatorType =
    generatorTypes.find(t => args1.includes(t.name)) ||
    generatorTypes.find(t => t.name === 'js')
  return {
    generatorType,
    moduleName: args.find(arg => !reg.generatorType.test(arg)),
  }
}

function question(rl, item, key, def, cb) {
  rl.question(chalk.cyan(`>>  ${key}: ${def ? `(${def})` : ''} `), answer => {
    // const ans = answer || def
    // if (invalidChar.some(c => ans.indexOf(c) > -1)) {
    //   console.error(chalk.red('Error: Invalid value!'))
    //   question(rl, item, key, def, cb)
    // } else {
    //   console.log(` ${key} is `, chalk.greenBright(ans))
    //
    //   // eslint-disable-next-line no-param-reassign
    //   item.value = item.dealFn ? item.dealFn(ans) : ans.trim()
    //   cb()
    // }

    const ans =
      answer.replace(new RegExp(`[${invalidChar.join('')}]+`, 'g'), '') || def
    console.log(` ${key} is `, chalk.greenBright(ans))

    // eslint-disable-next-line no-param-reassign
    item.value = item.dealFn ? item.dealFn(ans) : ans.trim()
    cb()
  })
}

function dealSpawnProcess(innerProcess) {
  const { error } = innerProcess
  if (error && error.code === 'ENOENT') {
    throw error
  }
}

module.exports = {
  getGeneratorTypes,
  arrayFlat,
  getFile,
  dirFlat,
  resolve,
  mkDir,
  dealArgs,
  question,
  dealSpawnProcess,
}
