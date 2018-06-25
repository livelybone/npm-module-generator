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
      console.log(ele);
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

module.exports = {
  getGeneratorTypes,
  arrayFlat,
  getFile,
  dirFlat,
  resolve,
};
