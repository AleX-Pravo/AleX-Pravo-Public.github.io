'use strict';

const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../config');

/**
 * Server main task
 */
gulp.task('server', function() {
    return browserSync(config.server);
});

