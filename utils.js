/*!
 * is-enabled <https://github.com/doowb/is-enabled>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils; // eslint-disable-line no-native-reassign

/**
 * Lazily required module dependencies
 */

require('extend-shallow', 'extend');
require('falsey');
require = fn; // eslint-disable-line no-native-reassign

// default keywords for falsey
var keywords = ['none', 'nil', 'nope', 'no', 'not', 'nada', '0', 'false'];

/**
 * Check if a value is falsey with the given keywords.
 *
 * @param  {String} `val` Value to check for falsey
 * @param  {Object} `options` Options to pass to falsey
 * @return {Boolean} `true` if `val` is falsey
 */

utils.isFalsey = function(val, options) {
  var opts = utils.extend({keywords: keywords}, options);
  return utils.falsey(val, opts.keywords);
};

utils.isEmpty = function(val) {
  if (!val) return true;
  if (Array.isArray(val) && val.length === 0) {
    return true;
  }
  return false;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
