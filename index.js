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
  var strict = opts.strict;

  return function(app) {
    if (typeof app.isEnabled === 'function') return;

    this.define('isEnabled', function(keys) {
      if (isEmpty(keys)) return !strict;
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }

      // filter out falsey keys and flip the flag when falsey
      var flag = true;
      keys = keys.filter(function(m) {
        if (utils.isFalsey(m, opts)) {
          flag = !flag;
          return false;
        }
        return true;
      });

      var key = keys[0];
      if (isEmpty(key)) return flag;
      return this[prop][key] === flag;
    });

    function isEmpty(val) {
      if (!val) return true;
      if (Array.isArray(val) && val.length === 0) {
        return true;
      }
      return false;
    }
  };
};

