const spawn = require('cross-spawn');
const fs = require('fs');
const readline = require('readline');
const utils = require('./utils');
const generatorTypes = utils.getGeneratorTypes();
const generatorType = generatorTypes.find(type => type.name === process.argv[2])
  || generatorTypes[0];
const generatorOptions = utils.getFile(require, generatorType.path).options();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// const root = __dirname;
const root = utils.resolve(__dirname, '../build');

console.log('Press ^C at any time to quit.');
let pro = Object.keys(generatorOptions)
  .reduce(
    (pre, key) => pre.then(() => new Promise((res) => {
      const item = generatorOptions[key];
      const def = item.defaultVal ? `(${item.defaultVal.call(generatorOptions, __dirname)})` : '';
      rl.resume();
      rl.question(`>  ${key}: ${def}`, (answer) => {
        const ans = answer || def;
        console.log(` ${key} is ${ans}`);
        rl.pause();
        res();
        generatorOptions[key].value = ans.trim();
      });
    })),
    Promise.resolve(),
  );

pro = pro
  .then(() => rl.close())
  .then(() => Promise.all(
    ...utils.dirFlat(generatorType.template).map(filename => new Promise((res, rej) => {
      fs.readFile(filename, { encoding: 'utf-8' }, (err, data) => {
        if (err) rej(err);
        const d = Object.keys(generatorOptions).reduce((pre, key) => {
          const item = generatorOptions[key];
          pre.replace(item.replace, item.value);
          return pre;
        }, data);
        fs.writeFile(utils.resolve(root, `.${filename.split(generatorType.template)[1]}`), d, { encoding: 'utf-8' }, (e) => {
          if (e) rej(e);
          res();
        });
      });
    })),
  ));

/*try {
  const npmProcess = spawn.sync('npm', ['init'], { stdio: 'inherit' });
} catch (e) {
  console.error(e);
}*/

pro.catch(e => console.log(e));
