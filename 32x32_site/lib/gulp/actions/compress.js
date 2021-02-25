'use strict';

const minifier = require('gulp-minifier'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    config = require('../config.js');

/**
 * Gulp compress action
 * @param {Object} gulpSrc
 * @param {Object} options
 */
module.exports = function(gulpSrc, options) {
    return gulpSrc
        .pipe(buffer())
        .pipe(minifier({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: true,
            getKeptComment: function (content, filePath) {
                let m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .on('error', config.error.show);
};
