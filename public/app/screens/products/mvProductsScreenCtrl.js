angular.module('app').controller('mvProductsScreenCtrl', function($scope, mvProduct, mvIdentity) {
  $scope.products = mvProduct.query();
  $scope.name = "mvProductsScreenCtrl";
  $scope.identity = mvIdentity;
});
