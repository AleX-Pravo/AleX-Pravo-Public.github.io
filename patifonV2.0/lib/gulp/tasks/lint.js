'use strict';

const gulp = require('gulp'),
      finder = require('../helpers/finder'),
      actions = require('../helpers/actions'),
      config = require('../config'),
      thisType = 'js',
      actionName = 'lint';

/**
 * Linter task
 */
gulp.task('lint', function() {
    // Init gulpSrc var
    let gulpSrc = void(0);
    // Bundles loop
    for (let i = 0; i < config.bundles.length; ++i) {
        // Verify type
        if (config.bundles[i].type !== thisType || !actions.has(config.bundles[i], actionName)) {
            continue;
        }

        // Assigns bundle
        let bundle = config.bundles[i];

        // Load src
        gulpSrc = gulp.src(finder(bundle.src));
        // Run action
        gulpSrc = actions.run(bundle, gulpSrc, actionName);
    }

    return gulpSrc;
});
