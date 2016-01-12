angular.module('app').directive('greaterThanZero', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link   : function (scope, elm, attrs, controller) {
      controller.$validators.greaterThanZero = function () {
        return Number(controller.$$rawModelValue) > 0;
      };
    }
  }
});