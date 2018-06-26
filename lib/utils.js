const path = require('path');
const fs = require('fs');

function getGeneratorTypes() {
  return fs.readdirSync(path.resolve(__dirname, './configs')).map((filename) => {
    const name = filename.replace('.conf.js', '');
    return {
      name,
      path: path.resolve(__dirname, './configs', filename),
      template: path.resolve(__dirname, './templates', name),
    };
  });
}

function arrayFlat(arr) {
  return arr.reduce(
    (pre, ele) => (ele instanceof Array ? pre.concat(arrayFlat(ele)) : pre.concat(ele)),
    [],
  );
}

function resolve(...urls) {
  return path.resolve(...urls);
}

function dirFlat(dirname) {
  return fs.readdirSync(dirname).reduce(
    (pre, ele) => {
      const dir = resolve(dirname, ele);
      return (fs.statSync(dir).isDirectory() ? pre.concat(dirFlat(dir))
        : pre.concat(dir));
    },
    [],
  );
}

function getFile(req, url) {
  return req(url);
}

function mkDir(pathname) {
  const dirname = path.dirname(pathname);
  if (!fs.existsSync(dirname)) {
    if (!fs.existsSync(path.dirname(dirname))) {
      mkDir(dirname);
    } else {
      fs.mkdirSync(dirname);
    }
  }
}

function dealArgs(generatorTypes) {
  const args = process.argv.slice(2);
  let index = 0;
  const generatorType = generatorTypes.find((t) => {
    if (t.name === args[0]) {
      index = 1;
      return true;
    } else if (t.name === args[1]) {
      index = 0;
      return true;
    }
    return false;
  }) || generatorTypes[0];
  return { generatorType, moduleName: args[index] };
}

module.exports = {
  getGeneratorTypes,
  arrayFlat,
  getFile,
  dirFlat,
  resolve,
  mkDir,
  dealArgs,
};
