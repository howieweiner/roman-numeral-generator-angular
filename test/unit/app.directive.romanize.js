(function () {
  'use strict';

  describe("Directive: Romanize", function () {
    var scope;
    var compile;
    var template;
    var compiledTemplate;

    // Load the module we want to test
    beforeEach(module('app'));

    // Before each test, create a new fresh scope and create/compile our directive
    beforeEach(inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      compile = $compile;

      template = '<div romanize></div>';

      // compile the template, and pass in the scope.
      compiledTemplate = compile(template)(scope);

      // Now run the digest cycle to update your template with new data
      scope.$digest();
    }));

    describe('when rendered', function () {
      it('should display an input box with placeholder text', function () {
        var inputs = compiledTemplate.find('input');

        expect(inputs.length).toEqual(1);

        var input = angular.element(inputs[0]);
        expect(input.attr('placeholder')).toBe('Type a numeral or integer to convert');
      });

      it('should not display a result or validation message', function () {
        var validationMessage = compiledTemplate.find('p');
        expect(validationMessage.html()).toBe('');

        var result = compiledTemplate.find('div').find('div');
        expect(result.html()).toBe('');
      });
    });

    describe('when invalid input is entered', function () {
      it('an error message should be displayed', function () {
        var inputs = compiledTemplate.find('input');
        var input = angular.element(inputs[0]);

        scope.input = '-1';
        scope.$digest();

        var validationMessage = compiledTemplate.find('p');
        expect(validationMessage.html()).toBe('Please provide a number between 1 and 3,999');

        scope.input = 'MMMM';
        scope.$digest();

        expect(validationMessage.html()).toBe('Invalid roman numeric');
      });
    });
  });
})();