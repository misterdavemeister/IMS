angular.module('app').controller('mvMainProductsCtrl', function($scope, mvCachedProduct) {
  var product_count = 0,
      value = 0,
      products = [];

  mvCachedProduct.query().$promise.then(function(collection) {
    collection.forEach(function(product) {
      $scope.products = [];
      products.push(product);
      product_count++;
      value += product.price * product.quantity;
      $scope.products = products;
      $scope.inventory = product_count;
//      $scope.value = value;
    });
  });
});