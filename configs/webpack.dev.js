const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: 'src'
        },
      },
    }),
    new CopyWebpackPlugin(
      [
        { // Copy bootstrap fonts to dist/fonts folder
          from: 'node_modules/bootstrap/dist/fonts',
          to: 'fonts'
        },
        { // Copy stylesheets
          from: 'src/public/css',
          to: 'css'
        },
        { // Copy images / icons
          from: 'src/public/img',
          to: 'img'
        },
        { // Copy images / icons
          from: 'src/app/components/store/featured-apps/image3.jpg',
          to: ''
        },
        { // Copy error page
          from: 'src/public/error',
          to: 'error'
        },
      ]
    ),
  ],
  devServer: {
    port: 4200,
    host: 'localhost',
    historyApiFallback: {
    rewrites: [
        // shows index.html as the landing page
        { from: /^\/$/, to: '/index.html' },
        // shows error/404.html on all other pages
        { from: /./, to: '/error/404.html' },
    ],
},
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      }
    },
  },
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
