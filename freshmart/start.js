'use strict';

// Assigns process exec function
const exec = require('child_process').exec;

// Assigns environment -> second script argument (3 - his index)
let environment = (typeof process.argv[3] === 'undefined' || process.argv[3].indexOf('dev') !== -1) ? 'development' : 'production';
// Assigns build flag -> first script argument (2 - his index)
let gulpCommand = typeof process.argv[2] !== 'undefined' ? process.argv[2].toString() : '';

// Init command var
let commandLine = 'gulp ' + gulpCommand;

// Set environment by os platform
if (process.platform === 'win32') {
    // tricks : https://github.com/remy/nodemon/issues/184#issuecomment-87378478 (Just don't add the space after the NODE_ENV variable, just straight to &&:)
    commandLine = 'set NODE_ENV=' + environment + ' && ' + commandLine;
} else {
    commandLine = 'export NODE_ENV=' + environment + ' && ' + commandLine;
}

// Exec command
let command = exec(commandLine);
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
