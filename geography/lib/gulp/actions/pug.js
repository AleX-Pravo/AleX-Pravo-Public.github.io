'use strict';

const pug = require('gulp-pug'),
    config = require('../config.js');

/**
 * Gulp pug (old Jade) plugin's action
 * @see https://www.npmjs.com/package/gulp-pug
 * @see https://pugjs.org/api/getting-started.html
 * @param {Object} gulpSrc
 * @param {Object} options Pug API options
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc.pipe(pug(options)).on('error', config.error.show);
};