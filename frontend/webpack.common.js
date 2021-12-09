const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

commonConfig = (htmlWebpackOptions) => {

  const buildPath = path.resolve(__dirname, 'public', 'build');
  const mainPath = path.resolve(__dirname, 'src', 'main/entry.tsx');

  return {
    cache: {
      compression: 'gzip',
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.node-build-cache'),
      name: 'build-cache',
      maxAge: 43200000,
    },
    entry: {
      mainBundle: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        mainPath,
      ],
    },
    optimization: {
      moduleIds: 'deterministic',
      chunkIds: 'named',
      splitChunks: {
        maxInitialRequests: Infinity,
        minSize: 0,
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `vendor.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
    output: {
      crossOriginLoading: 'anonymous',
      filename: 'js/[name].[contenthash].js',
      path: buildPath,
      publicPath: '/',
      assetModuleFilename: 'assets/[hash][ext][query]'
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
        use: [
          //   {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: '/'
          //   },
          // }
          {
            loader: 'style-loader'
          }
          , {
            loader: 'css-loader',
            options: {
              sourceMap: true
            },
          }, {
            loader: 'resolve-url-loader',
            options: {},
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }, {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      }, {
        test: /\.(otf|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        }
      }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      // new MiniCssExtractPlugin({
      //   filename: 'css/[name][hash].css',
      //   chunkFilename: 'css/[id][hash].css',
      //   publicPath: '/'
      // }),
      new CompressionPlugin(),
      new HtmlWebpackPlugin({
        chunks: ['mainBundle'],
        ...htmlWebpackOptions
      }),
    ],
  };
}

module.exports = { commonConfig };
