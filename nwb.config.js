module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'CopaAirlinesFormregister',
      externals: {
        react: 'React'
      }
    }
  }
}