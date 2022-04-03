const path = require('path');
const { merge } = require('webpack-merge');

const config = require('./webpack.config');

console.log(path.resolve(__dirname, '../public'),)

module.exports = merge(config, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    hot : false
  },

  cache : false,

  output: {
    path: path.resolve(__dirname, '../public'),
    assetModuleFilename: '[name][ext]',
    clean: true,
  },
});
