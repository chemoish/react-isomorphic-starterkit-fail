var webpack = require('webpack');
var config = require('./webpack.config.client');
var hostname = 'localhost';
var port = 8080;

config.cache = true;
config.debug = true;
config.devtool = 'inline-source-map';

config.entry.bundle.unshift(
  'webpack-dev-server/client?http://' + hostname + ':' + port,
  'webpack/hot/only-dev-server'
);

config.output.publicPath = 'http://' + hostname + ':' + port + '/build/';
config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __PRODUCTION__: false,
    __DEV__: true
  }),

  new webpack.HotModuleReplacementPlugin()
];

config.module.loaders = [{
  exclude: /node_modules/,
  loader:  'babel-loader?cacheDirectory&presets[]=es2015-loose&presets[]=react&presets[]=react-hmre',
  test:    /\.jsx?$/
}];

config.devServer = {
  headers:    { 'Access-Control-Allow-Origin': '*' },
  host:       hostname,
  hot:        true,
  inline:     true,
  lazy:       false,
  noInfo:     true,
  publicPath: config.output.publicPath,
  quiet:      true,
  stats:      { colors: true }
};

module.exports = config;
