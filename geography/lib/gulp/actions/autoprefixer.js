'use strict';

const prefix = require('gulp-autoprefixer'),
    config = require('../config.js');

/**
 * Gulp autoprefixer action
 * @param {Object} gulpSrc
 * @param {Object} options
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(prefix(options)).on('error', config.error.show);
};
