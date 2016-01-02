angular.module('app')
       .controller('listItemsDirectiveCtrl', function($scope) {
         $scope.reverseOrder = function(name) {
           $scope.sortOrder = name[0] == '-' ? name.slice(1) : '-' + name;
         };
       })
       .directive('listItems', function() {
         return {
           restrict: 'E',
           templateUrl: '/partials/common/templates/list-items',
           controller: 'listItemsDirectiveCtrl'
         };
       });