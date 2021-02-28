'use strict';

const prefix = require('gulp-autoprefixer');

/**
 * Gulp autoprefixer action
 * @param {Object} gulpSrc
 * @param {Object} options
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(prefix(options));
};
