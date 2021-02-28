'use strict';

const gulp = require('gulp'),
    header = require('gulp-header'),
    fs = require('fs'),
    actions = require('../helpers/actions'),
    fileName = 'normalize',
    fileExt = '.css',
    fileMinExt = '.min.css',
    filePath = './bower_components/normalize.css/',
    tmpDir = './tmp/';

/**
 * Before run method
 * @param callback function
 * @return {void}
 */
let beforeRun = function(callback) {
    // Prepare normalize file
    let gulpSrc = gulp.src(filePath + fileName + fileExt);
    gulpSrc = actions.run({
        actions: {
            compress: void(0)
        }
    }, gulpSrc);
    gulpSrc
        .pipe(gulp.dest(tmpDir))
        .on('end', function () {
            if (typeof callback === 'function') {
                callback();
            }
        });
};

/**
 * Main run function
 * @param {Object} gulpSrc
 * @return {Object}
 */
let run = function(gulpSrc) {
    return gulpSrc.pipe(header( fs.readFileSync(tmpDir + fileName + fileMinExt, 'utf8') ));
};

// Exports functions
module.exports = {
    beforeRun: beforeRun,
    run: run
};
