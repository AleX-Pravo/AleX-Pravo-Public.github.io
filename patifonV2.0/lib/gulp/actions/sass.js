'use strict';

const sass = require('gulp-sass'),
    config = require('../config.js');

/**
 * Rigger gulp action
 * @param {Object} gulpSrc
 * @param {Object} options
 * @returns {Object}
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(sass(options)).on('error', config.error.show);
};
