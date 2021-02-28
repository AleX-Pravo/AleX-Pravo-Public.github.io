'use strict';

const imagemin = require('gulp-imagemin'),
    config = require('../config.js');

/**
 * Gulp imagemin action
 * @param {Object} gulpSrc
 * @param {Object} options
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(imagemin(options)).on('error', config.error.show);
};
