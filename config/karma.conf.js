module.exports = function (c) {
  const _ = require('lodash');
  let testWebpackConfig = require('./webpack.test.js')({
    env: 'test'
  });
  const process = require('process');
  process.env.CHROME_BIN = require('puppeteer').executablePath();
  let i = require('istanbul');
  i.Report.register(require('istanbul-reporter-shield-badge'));

  const enviroment = process.env.ENVIROMENT;

  let report = ['progress', 'coverage', 'remap-coverage'];
  let viewConsole = false;
  if (_.isUndefined(process.env.ENVIROMENT)) {
    report = ['mocha', 'coverage', 'remap-coverage'];
    viewConsole = true;
  }

  let conf = {
    basePath: '..',
    frameworks: ['jasmine'],
    client: {
      captureConsole: viewConsole
    },
    files: [{
        pattern: './config/spec-bundle.js',
        watched: false
      },
      {
        pattern: './src/assets/**/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      },
    ],
    exclude: [],
    preprocessors: {
      './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-spec-reporter'),
      require('karma-coverage'),
      require('karma-mocha-reporter'),
      require('karma-remap-coverage'),
      require('karma-sourcemap-loader'),
    ],
    webpack: testWebpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    reporters: report,
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/',
    },
    specReporter: {
      maxLogLines: 3,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true,
    },
    coverageReporter: {
      type: 'in-memory'
    },
    port: 9876,
    colors: true,
    logLevel: c.LOG_WARN,
    autoWatch: false,
    browsers: ['HeadlessChrome'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    singleRun: true,
    concurrency: Infinity,
  };
  c.set(conf);
  i.Report.create('shield-badge');
};
