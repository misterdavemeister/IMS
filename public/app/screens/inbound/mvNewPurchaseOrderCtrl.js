angular.module('app').controller('mvNewPurchaseOrderCtrl', function($scope, $routeParams, mvCachedProduct) {
  $scope.products = mvCachedProduct.query();

  if ($routeParams.id) {
    $scope.products.$promise.then(function (collection) {
      collection.forEach(function (product) {
        if (product._id === $routeParams.id) { $scope.product = product; }
      })
    });
  }
});