'use strict';

const imagemin = require('gulp-imagemin');

/**
 * Gulp imagemin action
 * @param {Object} gulpSrc
 * @param {Object} options
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(imagemin(options));
};
