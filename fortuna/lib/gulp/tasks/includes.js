'use strict';

const gulp = require('gulp'),
    includes = require('../helpers/includes'),
    config = require('../config');

/**
 * Task prepare all bundles includes
 */
gulp.task('includes', function() {
    // Promises array
    let promises = [];

    // Bundles loop
    for (let i = 0; i < config.bundles.length; ++i) {
        let bundle = config.bundles[i];
        promises.push( new Promise(function(resolve, reject) {
            resolve( includes.beforeRun(bundle) );
        }) );
    }

    return Promise.all(promises);
});