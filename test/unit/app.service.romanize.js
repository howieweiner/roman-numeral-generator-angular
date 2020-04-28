(function () {
  'use strict';

  describe("Service: RomanizeService - convert integer to roman", function () {
    var service,
      generateErrMsg = 'Please provide a number between 1 and 3,999';

    // Load the module we want to test
    beforeEach(module('app'));

    // inject the service
    beforeEach(inject(function (RomanizeService) {
      service = RomanizeService;
    }));

    it('should raise a validation error if a alpha characters are supplied', function () {
      var generate = function() {
        service.generate('2q3');
      };
      expect(generate).toThrow(generateErrMsg);
    });

    it('should raise a validation error if no value is supplied', function () {
      var generate = function() {
        service.generate('');
      };
      expect(generate).toThrow(generateErrMsg);
    });

    it('should raise a validation error if a number less than 1 is supplied', function () {
      var generate = function() {
        service.generate('-1');
      };
      expect(generate).toThrow(generateErrMsg);

      generate = function() {
        service.generate('0');
      };
      expect(generate).toThrow(generateErrMsg);
    });

    it('should raise a validation error if a number less greater than 3999 is supplied', function () {
      var generate = function() {
        service.generate('4000');
      };
      expect(generate).toThrow(generateErrMsg);

      generate = function() {
        service.generate('3999');
      };
      expect(generate).not.toThrow(generateErrMsg);
    });

    it('should correctly convert valid integers', function () {
      expect(service.generate('2')).toBe('II');
      expect(service.generate('11')).toBe('XI');
      expect(service.generate('123')).toBe('CXXIII');
      expect(service.generate('1234')).toBe('MCCXXXIV');
      expect(service.generate('3421')).toBe('MMMCDXXI');
      expect(service.generate('3001')).toBe('MMMI');
    });
  });

  describe("Service: RomanizeService - convert roman to integer", function () {
    var service,
      parseErrMsg = 'Invalid roman numeric';

    // Load the module we want to test
    beforeEach(module('app'));

    // inject the service
    beforeEach(inject(function (RomanizeService) {
      service = RomanizeService;
    }));

    it('should raise a validation error if no value is supplied', function () {
      var parse = function() {
        service.parse('');
      };
      expect(parse).toThrow(parseErrMsg);
    });

    it('should raise a validation error if invalid numerals are supplied', function () {
      var parse = function() {
        service.parse('IIII');
      };
      expect(parse).toThrow(parseErrMsg);

      parse = function() {
        service.parse('IC');
      };
      expect(parse).toThrow(parseErrMsg);

      parse = function() {
        service.parse('XXXX');
      };
      expect(parse).toThrow(parseErrMsg);

      parse = function() {
        service.parse('XD');
      };
      expect(parse).toThrow(parseErrMsg);

      parse = function() {
        service.parse('CCCC');
      };
      expect(parse).toThrow(parseErrMsg);

      parse = function() {
        service.parse('MMMM');
      };
      expect(parse).toThrow(parseErrMsg);
    });

    it('should successfully parse valid numerals', function () {
      expect(service.parse('I')).toBe(1);
      expect(service.parse('IV')).toBe(4);
      expect(service.parse('VI')).toBe(6);
      expect(service.parse('IX')).toBe(9);
      expect(service.parse('X')).toBe(10);
      expect(service.parse('XI')).toBe(11);
      expect(service.parse('XCIX')).toBe(99);
      expect(service.parse('MMMCMXCIX')).toBe(3999);
    });
  });
})();