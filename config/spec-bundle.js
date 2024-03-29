Error.stackTraceLimit = Infinity;

/* core-js requirements */
require('core-js/es6');
require('core-js/es7/reflect');

/* zone requirements */
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

/* rxjs requirements */
require('rxjs/Rx');

let testing = require('@angular/core/testing');
let browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());

let context = require.context('../src', true, /\.spec\.ts$/);
context.keys().map(context);
