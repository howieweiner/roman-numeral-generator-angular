(function () {
  'use strict';

  angular
    .module('app')
    .service('RomanizeService', RomanNumeralGenerator);

  function RomanNumeralGenerator() {
    var UNITS = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    var TENS = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    var HUNDREDS = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    var NUMERALS = {I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000};

    /**
     * Converts a decimal/arabic number to roman numerals.
     *
     * @param number  A decimal in the range of 1-3999
     * @returns {string}  conversion of decimal number
     */
    function generate(number) {
      validate(number);
      return convert(number);

      function validate(number) {
        // test that passed in value can be converted to an integer. Use unary operator rather than parseInt as parseInt
        // parses until it encounters a non-numeric character
        if (isNaN(+number)) {
          throw 'Please provide a number between 1 and 3,999';
        }

        number = +number;

        if (number < 1 || number > 3999) {
          throw 'Please provide a number between 1 and 3,999';
        }
      }

      /**
       * We need to do three lookups - for units, tens and hundreds
       * @param number
       * @returns {string}
       */
      function convert(number) {
        // break down number into units, tens, hundreds, thousands
        var digits = String(+number).split(""),
          count = 3,
          roman = '';

        // lookup numeral for units, tend and hundreds. pop off last 3 array elements in turn, lookup numeral and
        // prepend to previous.
        while (count--) {
          if (2 === count) {
            roman = (UNITS[+digits.pop()] || "") + roman;
          }
          else if (1 === count) {
            roman = (TENS[+digits.pop()] || "") + roman;
          }
          else {
            roman = (HUNDREDS[+digits.pop()] || "") + roman;
          }
        }

        // now deal with thousands, if required. If we have an array element left, this represents the thousands. We
        // ned an M for each thousand
        var thousands = digits.pop();
        if (thousands) {
          // convert int to array and join. Add 1 to int to create array of correct length
          roman = new Array(+thousands + 1).join('M') + roman;
        }

        return roman;
      }
    }

    /**
     * Converts a string representing roman numerals, into an integer
     */
    function parse(string) {
      // convert input to uppercase
      string = string.toUpperCase();
      validate(string);
      return convert(string);

      /**
       * We test for valid combinations of roman numerals - max repetition, valid preceding/following numerals
       * @param string
       */
      function validate(string) {
        if (string === '') {
          throw "Invalid roman numeric";
        }

        var re = /^M{0,3}(D?C{0,3}|C[MD])(L?X{0,3}|X[CL])(V?I{0,3}|I[XV])$/;

        if (!re.test(string)) {
          throw "Invalid roman numeric";
        }
      }

      function convert(string) {
        var value = 0,
          total = 0,
          nextVal;

        // loop through each roman letter and lookup corresponding value
        string = string.split('');

        while (string.length) {
          value = NUMERALS[string.shift()]; // read from left to right

          // We either want to add or subtract the next value from the total. If the current value is smaller than the
          // next value, we subtract e.g. if current value is I and next value is V, we subtract one
          nextVal = NUMERALS[string[0]];

          if (value < nextVal) {
            value = value * -1;
          }

          total += value;
        }
        return total;
      }
    }

    // public interface
    return {
      generate: function (number) {
        return generate(number);
      },
      parse: function (roman) {
        return parse(roman);
      }
    };
  }
})();