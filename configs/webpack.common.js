const webpack = require('webpack');
const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "lodash": "lodash-es",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader?loader=system',
        ],
        exclude: [/\.spec\.ts$/]
      },
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      chunksSortMode: 'dependency',
    }),
    new ForkCheckerPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
    new webpack.ProvidePlugin({   
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
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
          from: 'src/app/components/store/featured-apps/image4.jpg',
          to: ''
        },
        { // Copy error page
          from: 'src/public/error',
          to: 'error'
        },
      ]
    ),
  ],
  node: {
    global: true,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false,
  }
};
