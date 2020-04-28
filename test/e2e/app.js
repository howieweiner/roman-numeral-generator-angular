(function () {
  'use strict';

  describe("Roman numeral generator", function () {

    var inputField = element(by.model('input')),
      result = element(by.binding('output')),
      error = element(by.binding('error'));

    beforeEach(function () {
      browser.get('/src/');
    });

    it('should correctly display the page', function () {

      expect(inputField.isDisplayed()).toBeTruthy();
      expect(inputField.getAttribute('placeholder')).toEqual('Type a numeral or integer to convert');
      expect(result.isDisplayed()).toBeFalsy();
      expect(error.isDisplayed()).toBeFalsy();
    });

    it('should display a validation message when invalid input is entered', function () {

      inputField.sendKeys('-1');
      error.getText().then( function(text) {
        expect(text).toEqual('Please provide a number between 1 and 3,999');
      });
      expect(result.isDisplayed()).toBeFalsy();

      inputField.clear();

      inputField.sendKeys('MMMM');
      error.getText().then( function(text) {
        expect(text).toEqual('Invalid roman numeric');
      });
      expect(result.isDisplayed()).toBeFalsy();
    });

    it('should display a result when valid input is entered', function () {

      inputField.sendKeys('5');
      result.getText().then( function(text) {
        expect(text).toEqual('V');
      });
      expect(error.isDisplayed()).toBeFalsy();

      inputField.clear();

      inputField.sendKeys('V');
      result.getText().then( function(text) {
        expect(text).toEqual('5');
      });
      expect(error.isDisplayed()).toBeFalsy();

      inputField.clear();
      expect(result.isDisplayed()).toBeFalsy();
      expect(error.isDisplayed()).toBeFalsy();
    });
  });
})();