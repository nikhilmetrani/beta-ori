const helpers = require('./helpers');
const webpack = require('webpack');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "lodash": "lodash-es",
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [helpers.root('node_modules')]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular')
        ]
      },
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
      // {
      //   enforce: 'post',
      //   test: /\.ts$/,
      //   include: helpers.path.resolve('src'),
      //   loader: 'istanbul-instrumenter-loader',
      //   exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
      // },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true,
          resourcePath: 'src'
        },
      },
    }),
  ],
  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
