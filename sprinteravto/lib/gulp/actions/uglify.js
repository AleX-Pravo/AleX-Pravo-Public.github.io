'use strict';

const uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    config = require('../config.js');

/**
 * Gulp uglify action
 * @param {Object} gulpSrc
 * @param {Object} options
 */
module.exports = function (gulpSrc, options) {
    return gulpSrc.pipe(uglify(options))
        .pipe(rename({
            suffix: '.min'
        }))
        .on('error', config.error.show);
};
