angular.module('app').controller("mvMainReportsCtrl", function($scope, mvCachedProduct) {
  var inventory = 0,
      value = 0,
      products = [];

  mvCachedProduct.query().$promise.then(function(collection) {
    collection.forEach(function(product) {
      $scope.products = [];
      products.push(product);
      inventory += product.quantity;
      value += product.price * product.quantity;
      $scope.products = products;
      $scope.inventory = inventory;
      $scope.value = value;
    });
  });
});