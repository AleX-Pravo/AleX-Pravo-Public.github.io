'use strict';

const rigger = require('gulp-rigger');

/**
 * Rigger gulp action
 * @param {Object} gulpSrc
 * @param {Object} options
 * @returns {Object}
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(rigger());
};
