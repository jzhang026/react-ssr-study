var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const paths = require('../paths');
var browserConfig = {
  name: 'client',
  entry: './src/browser/index.js',
  mode: 'development',
  output: {
    path: paths.clientBuild,
    filename: 'bundle.js',
    publicPath: paths.publicPath
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ],
  stats: {
    colors: true
  }
}

var serverConfig = {
  name: 'server',
  entry: './src/server/index.js',
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()],
  output: {
    path: paths.serverBuild,
    filename: 'server.js',
    publicPath: paths.publicPath
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ],
  stats: {
    colors: true
  }
}

module.exports = [browserConfig, serverConfig]