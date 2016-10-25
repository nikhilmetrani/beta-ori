var ENV = process.env.npm_lifecycle_event;
var isTestWatch = ENV === 'test-watch';

module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.js');
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    files: [
      {pattern: './configs/spec-bundle.js', watched: false}
    ],
    preprocessors: {
      './configs/spec-bundle.js': ['webpack', 'sourcemap']
    },
    webpack: testWebpackConfig,
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },
    webpackServer: {
      noInfo: true
    },
    reporters: isTestWatch ? ['mocha']: ['mocha', 'coverage'],
    coverageReporter: isTestWatch ? undefined : {
      dir: 'coverage/',
      reporters: [{
        type: 'json',
        dir: 'coverage',
        subdir: 'json',
        file: 'coverage-final.json'
      }]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: isTestWatch ? ['Chrome'] : ['PhantomJS'], 
    singleRun: true
   });
};
