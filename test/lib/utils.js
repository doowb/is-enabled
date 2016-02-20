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
require = fn; // eslint-disable-line no-native-reassign

utils.isEnabled = require('../../');

/**
 * Expose `utils` modules
 */

module.exports = utils;
