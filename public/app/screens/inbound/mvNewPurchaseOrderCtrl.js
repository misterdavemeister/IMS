angular.module('app').controller('mvNewPurchaseOrderCtrl', function($scope, $routeParams, mvCachedProduct, mvCachedLocation) {
  $scope.products = mvCachedProduct.query();
  mvCachedLocation.query().$promise.then(function(collection) {
    $scope.location = collection[0].name;
    $scope.product = collection[0].products[0].name;
  });

  if ($routeParams.id) {
    $scope.products.$promise.then(function (collection) {
      collection.forEach(function (product) {
        if (product._id === $routeParams.id) { $scope.product = product; }
      })
    });
  }
});