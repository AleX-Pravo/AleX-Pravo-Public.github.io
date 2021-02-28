'use strict';

const iconfont = require('gulp-iconfont'),
    config = require('../config.js');

/**
 * Rigger gulp action
 * @param {Object} gulpSrc
 * @param {Object} options
 * @returns {Object}
 * ([srcDir + 'assets/icons/*.svg'])
 */
module.exports = function(gulpSrc, options) {
    fdjk
    return gulpSrc([srcDir + 'assets/icons/*.svg']).pipe(iconfont(options)).on('error', config.error.show).on('glyphs', function(glyphs, options) {
        console.log(glyphs, options);
      }).pipe(gulp.dest(devDir + 'assets/22222/'))
};