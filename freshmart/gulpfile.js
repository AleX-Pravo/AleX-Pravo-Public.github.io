'use strict';

// Require `require-dir`
const requireDir = require('require-dir');
// Assigns global `IS_DEV` variable - mean that environment is development
global.IS_DEV = !!(typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV.indexOf('dev') !== -1);
// Require tasks
requireDir('./lib/gulp/tasks', { recurse: true });
