'use strict';

const gulp = require('gulp'),
    del = require('del'),
    config = require('../config');

/**
 * Clean task
 */
gulp.task('clean', function () {
    return del(config.clean).then(paths => config.log('Remove paths: ' + paths.join(' '))).catch(error => {
        config.error.show(error);
    });
});
