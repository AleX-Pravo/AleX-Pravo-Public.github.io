'use strict';

const gcmq = require('gulp-group-css-media-queries'),
    config = require('../config.js');

/**
 * Plugin group css media queries
 * @param {Object} gulpSrc
 * @param {Object} options
 * @returns {Object}
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(gcmq()).on('error', config.error.show);
};
