const path = require('path');
const { merge } = require('webpack-merge');
const { commonConfig } = require('./webpack.common');

const config = merge(commonConfig({
  filename: 'index.html',
  templateParameters: {},
  template: path.resolve(__dirname, 'templates/main.html'),
}, 'Hardcoded'), {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    liveReload: false,
    magicHtml: false,
    static: {
      directory: path.join(__dirname, 'public/build'),
    },
    historyApiFallback: true,
    compress: false,
    port: 3001,
  },
  cache: {
    compression: 'gzip',
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.node-build-cache'),
    name: 'build-cache',
    maxAge: 43200000,
  },
});

module.exports = config;
