'use strict';

const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    finder = require('../helpers/finder'),
    actions = require('../helpers/actions'),
    includes = require('../helpers/includes'),
    config = require('../config'),
    thisType = 'js';

/**
 * JS task
 */
gulp.task('js', function () {
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
