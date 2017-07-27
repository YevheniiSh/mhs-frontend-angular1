'use strict';

describe('mhs.version module', function () {
    beforeEach(module('mhs.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
