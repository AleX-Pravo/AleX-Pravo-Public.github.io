'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    finder = require('../helpers/finder'),
    options = require('../helpers/options'),
    actions = require('../helpers/actions'),
    includes = require('../helpers/includes'),
    config = require('../config'),
    thisType = 'css';

/**
 * Css task
 */
gulp.task('css', function () {
    // Promises array
    let promises = [];
    // Bundles loop
    for (let i = 0; i < config.bundles.length; ++i) {
        // Verify type
        if (config.bundles[i].type !== thisType) {
            continue;
        }

        // Assigns bundle
        let bundle = config.bundles[i];
        // Create new Promise
        promises.push(new Promise(function (resolve, reject) {
            // Init gulpSrc var and load src
            let gulpSrc = gulp.src(finder(bundle.src));
            if (IS_DEV) {
                gulpSrc.pipe(sourcemaps.init());
            }

            // Verify if sass need
            if (options.has(bundle, 'options') && options.has(bundle.options, 'noSass') && options.get(bundle.options, 'noSass')) {
            } else {
                gulpSrc.pipe(sass.sync());
            }

            // Run bundle's gulp actions
            gulpSrc = actions.run(bundle, gulpSrc);
            // Run includes
            gulpSrc = includes.run(bundle, gulpSrc);
            if (IS_DEV) {
                gulpSrc.pipe(sourcemaps.write());
            }
            // Paste to `dest`
            gulpSrc
                .pipe(gulp.dest(bundle.dest))
                .on('end', function () {
                    config.log(thisType + ': ' + bundle.dest);
                    resolve(true);
                })
                .on('error', function () {
                    reject(false);
                });
        }));
    }
    // Return promises
    return Promise.all(promises);
});
