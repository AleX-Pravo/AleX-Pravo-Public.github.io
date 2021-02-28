'use strict';

const prettify = require('gulp-jsbeautifier'),
    config = require('../config.js');

/**
 * Pretty gulp action for pug
 * @param {Object} gulpSrc
 * @param {Object} options
 * @return {Object}
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(prettify(options)).on('error', config.error.show);
};
