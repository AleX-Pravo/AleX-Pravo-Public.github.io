'use strict';

const gulp = require('gulp'),
    config = require('../config');

/**
 * Copy task
 * @return {Promise}
 */
gulp.task('fonts', function() {
    return gulp.src(config.paths.srcDir + config.assets.fonts + '**/*').pipe(gulp.dest(config.paths.buildDir + config.assets.fonts)).on('error', config.error.show);
});
