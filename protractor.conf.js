exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'test/e2e/**/*.js'
  ],

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    includeStackTrace: true
  },

  chromeDriver: 'node_modules/protractor/selenium/chromedriver'
};