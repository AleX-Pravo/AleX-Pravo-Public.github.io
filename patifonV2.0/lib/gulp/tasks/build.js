'use strict';

const gulp = require('gulp'),
    gulpSequence = require('gulp-sequence');

/**
 * Prepare bundles task
 */
gulp.task('bundle', ['js', 'css', 'fonts', 'img', 'html', 'copy']);

/**
 * Main build task
 * 1. Clean folders
 * 2. Run linters
 * 3. Run next tasks
 */
gulp.task('build', gulpSequence(['clean' /*, 'lint'*/], 'includes', 'bundle'));
