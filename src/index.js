import chalk from 'chalk'
import { questions } from './utils'
import {
  cmd,
  copyDir,
  getConfig,
  getRoot,
  logVersion,
  initGit,
  npmInstall,
} from './processes'

async function run() {
  if (cmd.version) return logVersion()

  logVersion()

  const root = getRoot()
  const config = getConfig(root)

  console.log(chalk.yellow('>  Input, press ^C at any time to quit.\n\r'))
  await questions(Object.values(config))

  console.log(chalk.yellow('\n\r>  Start to create directories\n\r'))
  await copyDir(root, config)

  const spawnConf = {
    cwd: root,
    stdio: 'inherit',
  }

  if (!cmd.unGit) {
    const repository = config.repository && config.repository.value
    initGit(spawnConf, repository)
  }

  if (cmd.npm) npmInstall(spawnConf)

  console.log(chalk.cyan('\n\r Done\n\r\n\r'))
}

run().catch(e => console.log(chalk.bgRed('ERROR'), e))
