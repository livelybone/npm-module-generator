module.exports = {
  options: (packageJson = {}) => ({
    'project-name': {
      defaultVal: () => packageJson.name || '',
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
        return JSON.stringify(answer.split(',').map(word => word.trim()))
      },
      replace: '"{{keywords}}"',
    },
    'bugsUrl': {
      defaultVal() {
        if (packageJson.bugsUrl && packageJson.bugsUrl.url) return packageJson.bugsUrl.url
        const def = this.repository.value || ''
        const reg = /(http.*)$/
        return (reg.test(def) ? def.match(reg)[0] : def).replace('.git', '/issues')
      },
      replace: '{{bugsUrl}}',
    },
    'author': {
      defaultVal: () => packageJson.author || '',
      replace: '{{author}}',
    },
    'homepage': {
      defaultVal() {
        if (packageJson.homepage) return packageJson.homepage
        const def = (packageJson.repository && packageJson.repository.url) || this.repository.value || ''
        const reg = /(http.*)$/
        return (reg.test(def) ? def.match(reg)[0] : def).replace('.git', '#readme')
      },
      replace: '{{homepage}}',
    },
    'module-name': {
      defaultVal: () => 'ModuleName',
      replace: '{{ModuleName}}',
    },
  }),
}
