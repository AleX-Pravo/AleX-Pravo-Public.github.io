'use strict';

const config = require('../config');

/**
 * Include key in object
 * @type {String}
 */
let includeKey = 'include';

/**
 * Function check if object has actions key
 * @param  {Object} obj
 * @return {Boolean}
 */
let hasInclude = function(obj) {
    // Verify key in object
    return !!((includeKey in obj) && typeof obj[includeKey] !== 'undefined');
};

/**
 * Helper run bundle beforeRun include's method
 * @param {Object} obj main object
 * @return {Promise}
 */
let beforeRun = function(obj) {
    // Promises array
    let promises = [];

    if (!hasInclude(obj)) {
        return Promise.resolve(true);
    }

    // Loop by includes
    for (let i = 0; i < obj[includeKey].length; ++i) {
        // Load include
        let module = require(config.paths.includes + obj[includeKey][i]);
        // Run include and reassigns gulpSrc object
        promises.push( new Promise(function(resolve, reject) {
            module.beforeRun(function() {
                resolve(true);
            });
        }) );
    }

    return Promise.all(promises);
};

/**
 * Helper run bundle includes
 * @param {Object} obj main object
 * @param {Object} gulpSrc gulp source object
 * @return {Object} gulp object
 */
let run = function(obj, gulpSrc) {
    if (!hasInclude(obj)) {
        return gulpSrc;
    }

    // Loop by includes
    for (let i = 0; i < obj[includeKey].length; ++i) {
        // Load include
        let module = require(config.paths.includes + obj[includeKey][i]);
        // Run include and reassigns gulpSrc object
        gulpSrc = module.run(gulpSrc);
    }

    return gulpSrc;
};

// Exports functions
module.exports = {
    beforeRun: beforeRun,
    run: run
};
