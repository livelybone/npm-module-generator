const spawn = require('cross-spawn');
const fs = require('fs');
const readline = require('readline2');
const utils = require('./utils');

const args = utils.dealArgs(utils.getGeneratorTypes());

if (args.cmd) {
  console.log(`Version is ${utils.getFile(require, utils.resolve(__dirname, '../package.json')).version}`);
} else {
  const cwd = process.cwd();
  const root = utils.resolve(cwd, args.moduleName || '');

  if (args.moduleName && fs.existsSync(root)) {
    throw new Error(`${args.moduleName} already exists!`);
  }

  const packageJson = fs.existsSync(utils.resolve(root, 'package.json'))
    ? utils.getFile(require, utils.resolve(root, 'package.json')) : { name: args.moduleName };
  const { generatorType } = args;
  const plugin = utils.getFile(require, generatorType.path);
  const generatorOptions = plugin.options(packageJson);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('>  Input, press ^C at any time to quit.');
  let pro = Object.keys(generatorOptions)
    .reduce(
      (pre, key) => pre.then(() => new Promise((res) => {
        const item = generatorOptions[key];
        const def = item.defaultVal ? `${item.defaultVal.call(generatorOptions, __dirname)}` : '';
        rl.resume();
        rl.question(`>>  ${key}: ${def ? `(${def})` : ''}`, (answer) => {
          const ans = answer || def;
          if (/[^\w\s\u3220-\uFA29.,:;'"|?<>/\\[\]{}+\-()*&^%$#@!~]/.test(ans)) throw new Error('Invalid value!');
          console.log(` ${key} is ${ans}`);
          item.value = item.dealFn ? item.dealFn(ans) : ans.trim();
          res();
          rl.pause();
        });
      })),
      Promise.resolve(),
    );

  pro = pro
    .then(() => rl.close())
    .then(() => {
      console.log('\n\r>  Start to create directories\n\r');
      return Promise
        .all(utils
          .dirFlat(generatorType.template)
          .map(filename => new Promise((res, rej) => {
            const path = utils.resolve(root, `.${filename.split(generatorType.template)[1].replace('.example', '')}`);
            if (!fs.existsSync(path)) {
              fs.readFile(filename, { encoding: 'utf-8' }, (err, data) => {
                if (err) rej(err);
                const d = Object.keys(generatorOptions).reduce((pre, key) => {
                  const item = generatorOptions[key];
                  return pre.replace(item.replace, item.value);
                }, data);
                utils.mkDir(path);
                fs.writeFile(path, d, { encoding: 'utf-8' }, (e) => {
                  if (e) rej(e);
                  console.log(`>> '${filename.split(generatorType.template)[1].replace('.example', '')}': created`);
                  res();
                });
              });
            } else {
              res();
            }
          })))
        .then(() => console.log('\n\r Directories Done\n\r\n\r'));
    });

  pro = pro.then(() => {
    console.log('>  Start to install module:\n\r');
    console.log('>> npm i');
    const npmProcess = spawn.sync('npm', ['i'], {
      cwd: root,
      stdio: 'inherit',
    });
    const { error } = npmProcess;
    if (error && error.code === 'ENOENT') {
      throw error;
    }
    console.log('\n\r Done\n\r\n\r');
  });

  pro.catch(e => console.error(e));
}
