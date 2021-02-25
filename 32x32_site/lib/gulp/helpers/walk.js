/**
 * Recursive folder-walker helper
 */
'use strict';

const fs = require('fs');

/**
 * Main walk object for files
 * @type {Object}
 */
let walkObject = {};
/**
 * Function walk in folder and collect files
 * @param path path to directory
 * @return {Object}
 * Return files array, grouping by folders from narrow to deep
 * Example:
 *
 * ```js
 * {
 *     "images": [
 *         'images/content.png',
 *         'images/footer.png',
 *     ],
 *     ...
 *     "images/icon": [
 *         'images/icon/main.png',
 *         'images/icon/icon.png',
 *         'images/icon/form.png',
 *     ],
 *     ...
 * }
 * ```
 */
let walk = function(path) {
    if (!(path in walkObject)) {
        walkObject[path] = [];
    }
    let list = fs.readdirSync(path);
    list.forEach(function (file) {
        file = path + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            walk(file);
        } else {
            walkObject[path].push(file);
        }
    });
};

// Exports helper facade
module.exports = {
    /**
     * Function walk in folder and collect files
     * @param path path to directory
     * @see walk function above
     */
    walk: function(path) {
        walkObject = {};
        walk(path);
        return walkObject;
    }
};
