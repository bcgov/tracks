const path = require('path');
const { merge } = require('webpack-merge');
const { commonConfig } = require('./webpack.common');

const config = merge(commonConfig({
  filename: 'generated_index.html',
  templateParameters: {},
  template: path.resolve(__dirname, 'templates/main.html'),
}), {
  mode: 'production',
});

module.exports = config;
