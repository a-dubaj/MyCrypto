'use strict';
const webpack = require('webpack');
const path = require('path');
const ClearDistPlugin = require('./plugins/clearDist');
const config = require('./config');
const makeConfig = require('./makeConfig');

const electronConfig = {
  target: 'electron-main',
  mode: 'development',
  entry: {
    main: path.join(config.path.electron, 'main/index.ts'),
    preload: path.join(config.path.electron, 'preload/index.ts')
  },
  module: {
    rules: [config.typescriptRule]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: config.resolve.modules
  },
  output: {
    filename: '[name].js',
    path: path.resolve(config.path.output, 'electron-js')
  },
  plugins: [
    new ClearDistPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  externals: {
    '@ledgerhq/hw-transport-node-hid': 'commonjs @ledgerhq/hw-transport-node-hid'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  //'cheap-module-source-map'
  devtool: 'eval'
};

module.exports = electronConfig;
