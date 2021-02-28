'use strict';

/**
 * Finder function create paths by location and/or extension
 * @param {String} location
 * @param {String} ext
 * @returns {Array}
 */
module.exports = function(location, ext) {
    let files = [];

    if (typeof ext !== 'undefined' && ext) {
        files.push(location + '*.' + ext);
        files.push(location + '**/*.' + ext);
    } else {
        files.push(location + '**');
    }

    return files;
};
