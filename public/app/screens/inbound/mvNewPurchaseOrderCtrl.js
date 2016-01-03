angular.module('app').controller('mvNewPurchaseOrderCtrl', function($scope, $routeParams, mvCachedProduct, mvCachedLocation) {
  $scope.products = mvCachedProduct.query();
  mvCachedLocation.query().$promise.then(function(collection) {
    $scope.locations = collection;
    console.log($scope.locations);
  });

  if ($routeParams.id) {
    $scope.products.$promise.then(function (collection) {
      collection.forEach(function (product) {
        if (product._id === $routeParams.id) { $scope.product = product; }
      })
    });
  }
});