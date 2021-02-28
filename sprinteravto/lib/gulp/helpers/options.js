'use strict';

/**
 * Function check if object has key
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */
let has = function(obj, key) {
    return !!((key in obj) && typeof obj[key] !== 'undefined');
};

/**
 * Function return object's key
 * @param {Object} obj
 * @param {String} key
 * @return {Mixed}
 */
let get = function(obj, key) {
    if (!has(obj, key)) {
        return void(0);
    }

    return obj[key];
};

// Exports functions
module.exports = {
    has: has,
    get: get
};
