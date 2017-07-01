require('babel-register');

const webpack = require('../webpack.config.babel.js');

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['mocha', 'chai-sinon'],
    reporters: ['progress'],
    colors: true,
    browsers: ['ChromeHeadless'],
    files: ['test/browser/**/*.js'],
    preprocessors: {
      'test/**/*.js': ['webpack'],
      'src/**/*.js': ['webpack']
    },
    webpack,
    webpackMiddleware: { noInfo: true },
    concurrency: Infinity
  });
};
