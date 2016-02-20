/*!
 * is-enabled <https://github.com/doowb/is-enabled>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var plugin = require('../');
var Base = require('base');
var app;

describe('is-enabled', function() {
  beforeEach(function() {
    app = new Base();
  });

  it('should add an `isEnabled` method.', function() {
    app.use(plugin());
    assert.equal(typeof app.isEnabled, 'function');
  });

  it('should add an `isEnabled` method once', function() {
    app.use(plugin());
    app.use(plugin());
    assert.equal(typeof app.isEnabled, 'function');
  });

  it('should return `true` for an `undefined` key', function() {
    app.use(plugin());
    assert.equal(app.isEnabled(), true);
  });

  it('should return `true` for an empty array key', function() {
    app.use(plugin());
    assert.equal(app.isEnabled([]), true);
  });

  it('should return `true` for an empty string key', function() {
    app.use(plugin());
    assert.equal(app.isEnabled(''), true);
  });

  it('should return `false` for an `undefined` key when `strict` is `true`', function() {
    app.use(plugin({strict: true}));
    assert.equal(app.isEnabled(), false);
  });

  it('should return `false` for an empty array key when `strict` is `true`', function() {
    app.use(plugin({strict: true}));
    assert.equal(app.isEnabled([]), false);
  });

  it('should return `false` for an empty string key when `strict` is `true`', function() {
    app.use(plugin({strict: true}));
    assert.equal(app.isEnabled(''), false);
  });

  it('should return `false` for an `undefined` property', function() {
    app.use(plugin());
    assert.equal(app.isEnabled('verbose'), false);
  });

  it('should return `false` for a non boolean property', function() {
    app.use(plugin());
    app.options.verbose = 'verbose';
    assert.equal(app.isEnabled('verbose'), false);
  });

  it('should return `true` for a `true` property', function() {
    app.use(plugin());
    app.options.verbose = true;
    assert.equal(app.isEnabled('verbose'), true);
  });

  it('should return `false` for a `false` property', function() {
    app.use(plugin());
    app.options.verbose = false;
    assert.equal(app.isEnabled('verbose'), false);
  });

  it('should return `false` for a `true` property with a falsey key path', function() {
    app.use(plugin());
    app.options.verbose = true;
    assert.equal(app.isEnabled('not.verbose'), false);
  });

  it('should return `false` for a `true` property with a falsey key array', function() {
    app.use(plugin());
    app.options.verbose = true;
    assert.equal(app.isEnabled(['not', 'verbose']), false);
  });

  it('should return `true` for a `false` property with a falsey key path', function() {
    app.use(plugin());
    app.options.verbose = false;
    assert.equal(app.isEnabled('not.verbose'), true);
  });

  it('should return `false` when only falsey keys are passed', function() {
    app.use(plugin());
    assert.equal(app.isEnabled('not'), false);
  });

  it('should return `true` when only falsey keys are passed', function() {
    app.use(plugin());
    assert.equal(app.isEnabled('not.not'), true);
  });

  it('should use a custom object to look for properties', function() {
    app.use(plugin({prop: 'data'}));
    app.data = {
      verbose: true
    };
    assert.equal(app.isEnabled('verbose'), true);
  });
});
