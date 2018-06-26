module.exports = {
  options: (packageJson = {}) => ({
    'project-name': {
      defaultVal: () => packageJson.name,
      replace: /{{projectName}}/,
    },
    'description': {
      defaultVal: () => packageJson.description || 'A description for the module',
      replace: '{{description}}',
    },
    'repository': {
      defaultVal: () => (packageJson.repository && packageJson.repository.url) || '',
      replace: '{{repository}}',
    },
    'keywords': {
      defaultVal: () => (packageJson.keywords && packageJson.keywords.reduce((pre, key) => `${pre}, ${key}`)) || '',
      dealFn(answer) {
        return JSON.stringify(answer.split(',').map(word => word.trim()));
      },
      replace: '"{{keywords}}"',
    },
    'bugsUrl': {
      defaultVal() {
        if (packageJson.bugsUrl && packageJson.bugsUrl.url) return packageJson.bugsUrl.url;
        const def = this.repository.value || '';
        const reg = /(http.*)$/;
        return (reg.test(def) ? def.match(reg)[0] : def).replace('.git', '/issues');
      },
      replace: '{{bugsUrl}}',
    },
    'author': {
      defaultVal: () => packageJson.author || '',
      replace: '{{author}}',
    },
    'homepage': {
      defaultVal() {
        if (packageJson.homepage) return packageJson.homepage;
        const def = (packageJson.repository && packageJson.repository.url) || this.repository.value || '';
        const reg = /(http.*)$/;
        return (reg.test(def) ? def.match(reg)[0] : def).replace('.git', '#readme');
      },
      replace: '{{homepage}}',
    },
  }),
  devDependencies: {
    '@vue/test-utils': '^1.0.0-beta.19',
    'babel-core': '^6.26.3',
    'babel-eslint': '^8.2.3',
    'babel-loader': '^7.1.4',
    'babel-plugin-istanbul': '^4.1.6',
    'babel-preset-env': '^1.7.0',
    'babel-preset-stage-2': '^6.24.1',
    'chai': '^4.1.2',
    'cross-env': '^5.2.0',
    'eslint': '^4.19.1',
    'eslint-config-airbnb-base': '^12.1.0',
    'eslint-plugin-import': '^2.12.0',
    'eslint-plugin-vue': '^4.5.0',
    'karma': '^2.0.3',
    'karma-chai': '^0.1.0',
    'karma-chrome-launcher': '^2.2.0',
    'karma-coverage': '^1.1.2',
    'karma-mocha': '^1.3.0',
    'karma-sourcemap-loader': '^0.3.7',
    'karma-spec-reporter': '0.0.32',
    'karma-webpack': '^3.0.0',
    'mocha': '^5.2.0',
    'vue': '^2.5.16',
    'vue-loader': '^15.2.4',
    'vue-template-compiler': '^2.5.16',
    'webpack': '^4.12.0',
    'webpack-command': '^0.2.1',
  },
};
