'use strict';

/**
 * Prepare bundles
 * @param {Array} bundles
 * @param {Object} options
 * @returns {Array}
 */
module.exports = function(bundles, options) {

    /**
     * Prepare each bundle
     * @param {String} bundleType
     * @param {Object} bundle
     * @param {Object} options
     * @returns {Object}
     */
    let makeBundle = function(bundle, options) {
        // Prepare actions
        let actions = bundle.actions;
        if (typeof actions !== 'object' && !!(bundle.type in options.defaultActions)) {
            actions = options.defaultActions[ bundle.type ];
        }

        return {
            src: bundle.src + bundle.fileName,
            type: bundle.type,
            dest: bundle.dest,
            actions: actions,
            include: bundle.include,
            options: bundle.options
        };
    };

    // Init return var
    let pack = [];
    for (let i = 0; i < bundles.length; ++i) {
        // Make bundle
        pack.push(makeBundle(bundles[i], options));
    }
    return pack;
};
