'use strict';

const assert = require('assert');
const process = require('../../../../src/services/submission/hooks/process.js');

describe('submission process hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    process()(mockHook);

    assert.ok(mockHook.process);
  });
});
