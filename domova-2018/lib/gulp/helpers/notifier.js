'use strict';

const gutil = require('gulp-util');

/**
 * Basic notifier
 * @param {String} msg
 * @param {Boolean} isFail
 * @param {String} file
 */
module.exports = function(msg, isFail, file) {
    let message = msg || '',
        color = isFail ? 'red' : 'green',
        filePath = file || '';

    gutil.log(message, gutil.colors[color](filePath));
};
