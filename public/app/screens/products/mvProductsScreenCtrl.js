angular.module('app').controller('mvProductsScreenCtrl', function($scope, mvCachedProduct, mvIdentity) {
  $scope.products = mvCachedProduct.query();
  $scope.name = "mvProductsScreenCtrl";
  $scope.identity = mvIdentity;
});
