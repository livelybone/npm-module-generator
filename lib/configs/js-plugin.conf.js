module.exports = {
  options: (packageJson = {}) => ({
    'project-name': {
      defaultVal: () => packageJson.name || '',
      replace: /{{projectName}}/g,
    },
    'description': {
      defaultVal: () => packageJson.description || 'A description for the module',
      replace: /{{description}}/g,
    },
    'repository': {
      defaultVal: () => (packageJson.repository && packageJson.repository.url) || '',
      replace: /{{repository}}/g,
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
      replace: /{{bugsUrl}}/g,
    },
    'author': {
      defaultVal: () => packageJson.author || '',
      replace: /{{author}}/g,
    },
    'homepage': {
      defaultVal() {
        if (packageJson.homepage) return packageJson.homepage
        const def = (packageJson.repository && packageJson.repository.url) || this.repository.value || ''
        const reg = /(http.*)$/
        return (reg.test(def) ? def.match(reg)[0] : def).replace('.git', '#readme')
      },
      replace: /{{homepage}}/g,
    },
    'module-name': {
      defaultVal: () => 'ModuleName',
      replace: /{{ModuleName}}/g,
    },
    'demo-host-name': {
      defaultVal: () => 'livelybone.github.io',
      replace: /{{demoHostName}}/g,
    },
  }),
}
