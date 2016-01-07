var path = require('path');
var webpack = require('webpack');

var fs = require('fs');

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  target:  'node',
  cache:   false,
  context: __dirname,
  debug:   false,
  devtool: 'source-map',

  entry: [
    './src/server'
  ],

  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist')
  },

  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__:     false,
      __SERVER__:     true,
      __PRODUCTION__: true,
      __DEV__:        false
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],

  module: {
    preLoaders: [{
      exclude: /node_modules/,
      loader:  'eslint-loader',
      test:    /\.(js|jsx)$/
    }],

    loaders: [{
      exclude: /node_modules/,
      loader:  'babel-loader?presets[]=es2015-loose&presets[]=react',
      test:    /\.jsx?$/
    }]
  },

  externals: nodeModules,

  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.js',
      '.jsx'
    ]
  },

  node: {
    __dirname: true,
    fs:        'empty'
  }
};
