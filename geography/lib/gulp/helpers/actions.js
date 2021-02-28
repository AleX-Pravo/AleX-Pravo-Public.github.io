'use strict';

const config = require('../config');

/**
 * Actions key in object
 * @type {String}
 */
let actionKey = 'actions';

/**
 * Function check if object has actions key
 * @param {Object} obj
 * @return {Boolean}
 */
let hasActions = function(obj) {
    // Verify key in object
    return !!((actionKey in obj) && typeof obj[actionKey] !== 'undefined');
};

/**
 * Find action in bundle
 * @param {Object} obj
 * @param {String} action
 * @return {Boolean}
 */
let has = function(obj, action) {
    if (!hasActions(obj)) {
        return false;
    }

    // Loop by actions
    for (let i in obj[actionKey]) {
        if (!obj[actionKey].hasOwnProperty(i)) {
            continue;
        }

        if (i === action) {
            return true;
        }
    }

    return false;
};

/**
 * Run bundle actions
 * @param {Object} obj main object
 * @param {Object} gulpSrc gulp source object
 * @param {String} actionName action name if need run only one action
 * @return {Object} gulp object
 */
let run = function(obj, gulpSrc, actionName) {
    if (!hasActions(obj)) {
        return gulpSrc;
    }

    // Prepare action name
    actionName = actionName || void(0);

    // Loop by actions
    for (let i in obj[actionKey]) {
        if (!obj[actionKey].hasOwnProperty(i)) {
            continue;
        }

        if (typeof actionName === 'undefined' || actionName === i) {
            // Load gulp action
            let module = require(config.paths.actions + i);
            // Run gulp action and reassigns gulpSrc object
            gulpSrc = module(gulpSrc, obj[actionKey][i]);
        }
    }

    return gulpSrc;
};

// Exports functions
module.exports = {
    has: has,
    run: run
};
