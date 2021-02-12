const path = require('path')

module.exports = {
  alias: {
    '/@/': path.resolve('src'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: true,
      rewrite: (p) => p.replace(/^\/api/, ''),
    },
  },
}
