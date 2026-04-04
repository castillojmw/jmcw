const path = require('path');

module.exports = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: [
        path.resolve(__dirname, 'src/styles/breakpoints.css')
      ]
    },
    'postcss-custom-media': {}
  }
}