/*!
 * is-enabled <https://github.com/doowb/is-enabled>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

/**
 * Check if a property on an object is enabled and allow falsey values in
 * the search key to indicate toggling the flag that's checked.
 *
 * @param  {Object} `obj` Object to use when checking properties.
 * @param  {String|Array} `keys` Key path to use.
 * @param  {Object} `options` Options to use to when checking for falsey values.
 * @param  {Boolean} `strict` When `true`, return `false` when `keys` is an empty string or array. (Defaults to returning `true`)
 * @return {Boolean} If property value is considered "enabled" based on key path provided.
 * @api public
 */

module.exports = function isEnabled(obj, keys, options) {
  if (typeof obj !== 'object') {
    throw new TypeError('expected "obj" to be an "object"');
  }

  if (typeof keys === 'object' && !Array.isArray(keys)) {
    options = keys;
    keys = [];
  }

  var opts = utils.extend({strict: false}, options);
  if (utils.isEmpty(keys)) return !opts.strict;
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
  if (utils.isEmpty(key)) return flag;
  return obj[key] === flag;
};
