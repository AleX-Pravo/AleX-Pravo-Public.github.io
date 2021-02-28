'use strict';

const gulp = require('gulp'),
    header = require('gulp-header'),
    fs = require('fs'),
    actions = require('../helpers/actions'),
    config = require('../config'),
    fileName = 'normalize',
    fileExt = '.css',
    fileMinExt = '.min.css',
    filePath = './node_modules/normalize.css/',
    tmpDir = './tmp/';

/**
 * Before run method
 * @param callback function
 * @return {void}
 */
let beforeRun = function(callback) {
    // Prepare normalize file
    let gulpSrc = void(0);

    try {
        if (fs.statSync(filePath)) {
            gulpSrc = gulp.src(filePath + fileName + fileExt);
        }
    } catch(e) {
        // Set path to up dir
        gulpSrc = gulp.src('./.' + filePath + fileName + fileExt);
    }

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
        })
        .on('error', function (error) {
            config.error.show(error);
            reject(false);
        });
};

/**
 * Main run function
 * @param {Object} gulpSrc
 * @return {Object}
 */
let run = function(gulpSrc) {
    return gulpSrc.pipe(header( fs.readFileSync(tmpDir + fileName + fileMinExt, 'utf8') )).on('error', config.error.show);
};

// Exports functions
module.exports = {
    beforeRun: beforeRun,
    run: run
};
