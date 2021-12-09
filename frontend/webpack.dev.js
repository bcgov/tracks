const path = require('path');
const { merge } = require('webpack-merge');
const { commonConfig } = require('./webpack.common');

const config = merge(commonConfig({
  filename: 'index.html',
  templateParameters: {},
  template: path.resolve(__dirname, 'templates/dev.html'),
}), {
  mode: 'development',
  devtool: 'eval-source-map',
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
});

module.exports = config;
