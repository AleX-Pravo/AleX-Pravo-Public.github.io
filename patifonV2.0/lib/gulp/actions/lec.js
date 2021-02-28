'use strict';

const lec = require('gulp-line-ending-corrector'),
    config = require('../config.js');

/**
 * Gulp line-ending-corrector action
 * @param {Object} gulpSrc
 * @param {Object} options
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(lec(options)).on('error', config.error.show);
};
