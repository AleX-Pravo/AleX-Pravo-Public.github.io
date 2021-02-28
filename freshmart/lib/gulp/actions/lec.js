'use strict';

const lec = require('gulp-line-ending-corrector');

/**
 * Gulp line-ending-corrector action
 * @param {Object} gulpSrc
 * @param {Object} options
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(lec(options));
};
