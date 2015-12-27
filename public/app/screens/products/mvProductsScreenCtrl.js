angular.module('app').controller('mvProductsScreenCtrl', function($scope, mvCachedProduct, mvIdentity) {
  $scope.isHovering = false;
  $scope.products = mvCachedProduct.query();
  $scope.name = "mvProductsScreenCtrl";
  $scope.identity = mvIdentity;
  $scope.showButton = function() {
    console.log("hovering");
    $scope.isHovering = true;
  };
});
