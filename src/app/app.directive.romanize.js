(function () {
  'use strict';

  angular
    .module('app')
    .directive('romanize', ['RomanizeService', function (RomanizeService) {
      return {
        restrict: 'A', // only matches attribute name

        template: '\
          <div class="romanize">\
            <input type="text"\
                   class="form-control"\
                   placeholder="Type a numeral or integer to convert"\
                   ng-model="input"/>\
            <p class="text-danger text-center" ng-bind="error"></p>\
            <div class="well well-lg text-center output" ng-bind="output" ng-show="output"></div>\
          </div>\
        ',

        link: function (scope, element) {
          // get a reference to the input element
          var inputEl = element[0].getElementsByTagName('input')[0];

          // apply focus to the input
          inputEl.focus();

          // watch for changes to scope-bound input element
          scope.$watch('input', function (val) {
            if (val !== undefined) {
              scope.error = null;
              scope.output = null;

              if(val !== '') {
                // if value is an integer, then generate the value, otherwise parse the value. Assighn the returned
                // value to the scope-bound 'output' var.
                try {
                  if (isNaN(val)) {
                    scope.output = RomanizeService.parse(val);
                  }
                  else {
                    scope.output = RomanizeService.generate(val);
                  }
                }
                catch (e) {
                  // if a validation error occurs, then display error message
                  scope.error = e;
                }
              }
            }
          });
        }
      };
    }])
  ;
})();