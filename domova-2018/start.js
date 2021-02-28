'use strict';

// Assigns process exec function
var exec = require('child_process').exec;

// Assigns environment -> second script argument (3 - his index)
var environment = (typeof process.argv[3] === 'undefined' || process.argv[3].indexOf('dev') !== -1) ? 'development' : 'production';
// Assigns build flag -> first script argument (2 - his index)
var gulpCommand = typeof process.argv[2] !== 'undefined' ? process.argv[2].toString() : '';

// Prepare path to bowel folder
var bowerDir = (typeof process.argv[4] !== 'undefined' ? process.argv[4].toString() : '../') + 'bower/';

// Init command var
var commandLine = 'gulp ' + gulpCommand;

// Set environment by os platform
if (process.platform === 'win32') {
    // tricks : https://github.com/remy/nodemon/issues/184#issuecomment-87378478 (Just don't add the space after the NODE_ENV variable, just straight to &&:)
    commandLine = 'set NODE_ENV=' + environment + ' && set NODE_BOWER_DIR=' + bowerDir + ' && ' + commandLine;
} else {
    commandLine = 'export NODE_ENV=' + environment + ' && export NODE_BOWER_DIR=' + bowerDir + ' && ' + commandLine;
}

// Exec command
var command = exec(commandLine);
// Write stream data
command.stdout.on('data', function(data) {
    process.stdout.write(data);
});
command.stderr.on('data', function(data) {
    process.stderr.write(data);
});
command.on('error', function(err) {
    process.stderr.write(err);
});
