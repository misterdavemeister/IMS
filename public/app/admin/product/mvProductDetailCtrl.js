angular.module('app').controller('mvProductDetailCtrl', function($scope, $routeParams, mvCachedProduct) {
 mvCachedProduct.query().$promise.then(function(collection) {
   collection.forEach(function(product) {
     if (product._id === $routeParams.id) {
       $scope.product = product;
       for(var p in product) {
         $scope[p] = product[p];
       }
     }
   });
 })
});