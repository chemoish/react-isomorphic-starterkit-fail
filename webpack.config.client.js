var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: false,
  debug: false,
  devtool: false,

  entry: {
    bundle: [
      './src/client'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/'
  },

  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__:     true,
      __SERVER__:     false,
      __PRODUCTION__: true,
      __DEV__:        false
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
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

  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.js',
      '.jsx'
    ]
  }
};
