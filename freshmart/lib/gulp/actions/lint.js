'use strict';

const jshint = require('gulp-jshint'),
      map = require('map-stream'),
      config = require('../config');

/**
 * Gulp linter action
 * @param {Object} gulpSrc
 * @param {Object} options
 */
module.exports = function(gulpSrc, options) {

    let failReporter = map(function(file, cb) {
        if (!file.jshint.success) {
            config.log('JShint error!', true, file.relative);
        }
        cb(null, file);
    });

    return gulpSrc
        .pipe(jshint(options))
        .pipe(jshint.reporter())
        .pipe(failReporter);
};
