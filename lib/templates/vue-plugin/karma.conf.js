const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    // 浏览器环境
    browsers: ['Chrome'],
    // 测试框架
    frameworks: ['mocha', 'chai'],
    // 需要测试的文件，在 browsers 里面运行，使用 frameworks 测试js，通过 reporters 输出报告
    files: [
      '/test/**/*.spec.js',
    ],
    // 为入口文件制定预处理器，测试 js 之前用 webpack 和 sourcemap 处理一下
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    // 输出报告
    reporters: ['spec', 'coverage'],
    // 覆盖报告的配置
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
  });
};

const v = {
  'project-name': {
    defaultVal: __dirname => __dirname.split(path.sep).pop(),
    replace: '{{projectName}}',
  },
  'description': {
    defaultVal: () => 'A description for the module',
    replace: '{{description}}',
  },
  'bin': {
    defaultVal() {
      return this['project-name'].value;
    },
    replace: '{{bin}}',
  },
  'repository': {
    replace: '{{repository}}',
  },
  'keywords': {
    dealFn(answer) {
      return JSON.stringify(answer.split(',').map(word => word.trim()));
    },
    replace: '"{{keywords}}"',
  },
  'author': {
    replace: '{{author}}',
  },
  'bugsUrl': {
    defaultVal() {
      return this.repository.value.match(/(http.*)$/)[0].replace('.git', '/issues');
    },
    replace: '{{bugsUrl}}',
  },
  'homepage': {
    defaultVal() {
      return this.repository.value.match(/(http.*)$/)[0].replace('.git', '#readme');
    },
    replace: '{{homepage}}',
  },
}