module.exports = {
  options: (packageJson = {}) => ({
    'project-name': {
      defaultVal: () => packageJson.name || '',
      dealFn: answer => answer.replace(/\s+/g, ''),
      replace: /{{projectName}}/g,
    },
    'module-name': {
      defaultVal: () => {
        const name = packageJson.name.split('/').pop()
        if (name) {
          const arr = name.replace(/@+/g, '').split(/-+|_+|\.+/)
          return arr.reduce(
            (pre, word) => `${pre}${word[0].toUpperCase()}${word.substr(1)}`,
            '',
          )
        }
        return 'ModuleName'
      },
      replace: /{{ModuleName}}/g,
    },
    description: {
      defaultVal: () =>
        packageJson.description || 'A description for the module',
      replace: /{{description}}/g,
    },
    keywords: {
      defaultVal: () =>
        (packageJson.keywords &&
          packageJson.keywords.reduce((pre, key) => `${pre}, ${key}`)) ||
        '',
      dealFn: answer =>
        JSON.stringify(answer.split(',').map(word => word.trim())),
      replace: '"{{keywords}}"',
    },
    repository: {
      defaultVal: () =>
        (packageJson.repository && packageJson.repository.url) || '',
      replace: /{{repository}}/g,
    },
    bugsUrl: {
      defaultVal() {
        if (packageJson.bugsUrl && packageJson.bugsUrl.url) {
          return packageJson.bugsUrl.url
        }
        const def = this.repository.value || ''
        const reg = /(http.*)$/
        return (reg.test(def) ? def.match(reg)[0] : def).replace(
          '.git',
          '/issues',
        )
      },
      replace: /{{bugsUrl}}/g,
    },
    author: {
      defaultVal: () => packageJson.author || '',
      replace: /{{author}}/g,
    },
    homepage: {
      defaultVal() {
        if (packageJson.homepage) return packageJson.homepage
        const def =
          (packageJson.repository && packageJson.repository.url) ||
          this.repository.value ||
          ''
        const reg = /(http.*)$/
        return (reg.test(def) ? def.match(reg)[0] : def).replace(
          '.git',
          '#readme',
        )
      },
      replace: /{{homepage}}/g,
    },
  }),
}
