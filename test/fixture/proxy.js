'use strict';

/* global Proxy */

var assert = require('assert');

describe('fixture', function () {
    it('should have Harmony Proxies', function () {
        assert.notEqual(Proxy, null);
    });
});

