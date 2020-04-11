import fs from 'fs'
import chalk from 'chalk'
import ncp from 'ncp'
import {
  createTransform,
  getFile,
  parseArgs,
  resolve,
  spawnSync,
} from './utils'

export const { cmd, template, directory } = parseArgs()

export function logVersion() {
  console.log(
    `Version is ${chalk.yellow(
      getFile(require, resolve(__dirname, '../package.json')).version,
    )}`,
  )
}

export function getRoot() {
  const cwd = process.cwd()
  const root = resolve(cwd, directory || '')

  if (directory && fs.existsSync(root)) {
    console.log(chalk.bgRed('ERROR'), new Error(`${directory} already exists!`))
    process.exit(1)
  }

  return root
}

export function getConfig(root) {
  const packageJson = fs.existsSync(resolve(root, 'package.json'))
    ? getFile(require, resolve(root, 'package.json'))
    : { name: directory }
  const plugin = getFile(require, template.path)
  const config = plugin.options(packageJson)
  Object.entries(config).forEach(([name, item]) => {
    item.name = name
    item.defaultVal = item.defaultVal.bind(config)
  })
  return config
}

export function copyDir(root, config) {
  return new Promise(res =>
    ncp(
      template.template,
      root,
      {
        rename: filename => filename.replace(/\.example$/, ''),
        transform: (rStream, wStream) => {
          wStream.on('open', () => {
            rStream.pipe(createTransform(config)).pipe(wStream)
          })
          wStream.once('finish', () => {
            console.log(
              chalk.cyan(`>> ${wStream.path}: `),
              chalk.greenBright('created'),
            )
          })
        },
      },
      err => {
        if (err) {
          console.log(chalk.bgRed('ERROR'), err)
          process.exit(1)
        } else {
          res()
        }
      },
    ),
  ).then(() =>
    console.log('\n\r', chalk.bgCyan('DONE'), 'Directories created\n\r\n\r'),
  )
}

export function initGit(spawnConf, repository) {
  console.log(
    chalk.yellow(
      '> Git init, make sure that you already installed Git globally',
    ),
  )
  spawnSync('git', ['init', '-q'], spawnConf)

  if (repository) {
    spawnSync('git', ['remote', 'add', 'origin', repository], spawnConf)
  }
  console.log(
    '\n\r',
    chalk.bgCyan('DONE'),
    `Git init${repository ? `. Repository: ${repository}` : ''}\n\r\n\r`,
  )
}

export function npmInstall(spawnConf) {
  console.log(chalk.yellow('>  Start to install module:\n\r'))
  console.log('>> npm i')
  spawnSync('npm', ['i'], spawnConf)
}
