angular.module('app')
       .controller('listItemsDirectiveCtrl', function($scope) {

         $scope.reverseOrder = function(name) {
           $scope.sortOrder = name[0] == '-' ? name.slice(1) : '-' + name;
         };

         $scope.search = function(row) {
           return $scope.searchOpt !== '' ? (angular.lowercase(String(row[$scope.searchOpt])).indexOf(angular.lowercase($scope.searchText)) !== -1) : function(r) {
             var bool = false;
             $scope.searchOptions.forEach(function(opt) {
               var property = opt.value;
               if ($scope.searchText === '' || angular.lowercase(String(r[property])).indexOf(angular.lowercase($scope.searchText)) !== -1) {
                 bool = true;
               }
             });
             return bool;
           }(row);
         };
       })
       .directive('listItems', function() {
         return {
           restrict: 'E',
           templateUrl: '/partials/common/templates/list-items',
           controller: 'listItemsDirectiveCtrl'
         };
       });