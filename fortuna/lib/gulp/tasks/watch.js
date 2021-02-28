'use strict';

const gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    finder = require('../helpers/finder'),
    config = require('../config');

/**
 * Watch processing task
 */
gulp.task('watching', function () {
    global.isWatching = true;
});

/**
 * Run watchers task
 */
gulp.task('run_watch', function () {
    // Watch assets loop
    for (let index in config.watchAssets) {
        if (!config.watchAssets.hasOwnProperty(index)) {
            continue;
        }

        // Create path
        for (let i = 0; i < config.watchAssets[index].length; ++i) {
            let paths = finder(config.watchAssets[index][i], '*');
            config.log('action: `' + index + '` watch on: ' + paths);
            // Watch on
            watch(paths, function () {
                gulp.start(index, function () {
                    // Reload browser after task
                    browserSync.reload();
                });
            });
        }
    }
});

/**
 * Main watch task
 */
gulp.task('watch', ['watching', 'build'], function () {
    gulp.start('run_watch');
    gulp.start('server');
});
