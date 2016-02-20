/*!
 * is-enabled <https://github.com/doowb/is-enabled>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

/**
 * Create a plugin to add `isEnabled` to an application.
 *
 * @param  {Object} `options` Options to use to when checking for falsey values.
 * @return {Function} Plugin function to pass into `app.use`
 * @api public
 */

module.exports = function(options) {
  var opts = utils.extend({prop: 'options', strict: false}, options);
  var prop = opts.prop;

  return function(app) {
    if (typeof app.isEnabled === 'function') return;

    this.define('isEnabled', function(keys) {
      return utils.isEnabled(this[prop], keys, opts);
    });
  };
};

