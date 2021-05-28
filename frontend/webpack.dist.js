const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv').config();

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'src', 'main/entry.tsx');

const config = {
  mode: 'production',
  entry: {
    mainBundle: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      mainPath,
    ],
  },
  optimization: {
    splitChunks: {
      maxInitialRequests: Infinity,
      minSize: 0,
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  output: {
    crossOriginLoading: 'anonymous',
    filename: '[name].[contenthash].js',
    path: buildPath,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {},
  },
  module: {
    rules: [{
      test: /\.[jt]sx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/proposal-class-properties',
            '@babel/proposal-object-rest-spread',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-optional-chaining'
          ]
        }
      }
    }, {
      test: /\.(s?)css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: false,
          reloadAll: true,
        },
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
      ],
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: ['file-loader?name=[name].[ext]'],
    }, {
      test: /\.(otf|eot|svg|ttf|woff|woff2)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      }],
    }
    ],
  },
  devtool: 'source-map',
  plugins: [
    new Webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CompressionPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['mainBundle'],
      filename: 'generated_index.html',
      templateParameters: {},
      template: path.resolve(__dirname, 'templates/main.html'),
    }),
  ],
};

module.exports = config;
