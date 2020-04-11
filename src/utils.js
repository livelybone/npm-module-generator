import arg from 'arg'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import stream from 'stream'
import spawn from 'cross-spawn'
import readline from 'readline'

export const invalidChar = ['', '\u001b']

export function resolve(...urls) {
  return path.resolve(...urls)
}

export function getFile(req, url) {
  return req(url)
}

function getTemplates() {
  return fs
    .readdirSync(resolve(__dirname, './configs'))
    .reduce((pre, filename) => {
      const name = filename.replace('.conf.js', '')
      return {
        ...pre,
        [name]: {
          name,
          path: resolve(__dirname, './configs', filename),
          template: resolve(__dirname, './templates', name),
        },
      }
    }, {})
}

export function parseArgs() {
  const args = arg(
    {
      '--version': String,
      '--un-git': Boolean,
      '--install': Boolean,

      '-v': '--version',
      '-version': '--version',
      '--v': '--version',
      '-un-git': '--un-git',
      '-i': '--install',
      '-install': '--install',
      '--i': '--install',
    },
    { permissive: true },
  )

  const templates = getTemplates()

  const [directory, templateName = ''] = args._.sort((a, b) => {
    const index = v => (/^--/.test(v) ? 1 : 0)
    return index(a) - index(b)
  })

  const reg = /[a-zA-Z0-9@_\-.]*/
  if (directory && !reg.test(directory)) {
    throw new Error(
      `Argument directory ${directory} is not invalid, tested with reg: /[a-zA-Z0-9@_\\-.]*/`,
    )
  }

  return {
    cmd: {
      version: args['--version'],
      unGit: args['--un-git'],
      npm: args['--install'],
    },
    template: templates[templateName.replace(/^-+/, '')] || templates.js,
    directory,
  }
}

function question(rl, item, key, defaultVal) {
  return new Promise(res => {
    rl.question(
      chalk.yellow('?') +
        chalk.cyan(`  ${key}: `) +
        (defaultVal ? `(${defaultVal}) ` : ''),
      answer => {
        const ans =
          answer.replace(new RegExp(`[${invalidChar.join('')}]+`, 'g'), '') ||
          defaultVal
        if (ans) console.log(` ${key} is `, chalk.greenBright(ans))

        item.value = item.dealFn ? item.dealFn(ans) : ans.trim()
        res()
      },
    )
  })
}

export function questions(items) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return items
    .reduce(
      (pre, item) =>
        pre.then(async () => {
          await question(rl, item, item.name, item.defaultValue)
          return { ...pre, [item.name]: item.value }
        }),
      Promise.resolve({}),
    )
    .finally(() => {
      rl.close()
    })
}

export function spawnSync(...args) {
  const { error } = spawn.sync(...args)
  if (error && error.code === 'ENOENT') {
    throw error
  }
}

export function createTransform(config) {
  return new stream.Transform({
    transform(chunk, encoding, next) {
      const data = Object.keys(config).reduce((pre, key) => {
        const item = config[key]
        return pre.toString().replace(item.replace, item.value)
      }, chunk)

      next(null, data)
    },
  })
}
