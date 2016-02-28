angular.module('app').controller('mvMainProductsCtrl', function($scope, mvCachedProduct) {
  var product_count = 0,
      product_low_count = 0,
      products = [];

  mvCachedProduct.query().$promise.then(function(collection) {
    collection.forEach(function(product) {
      products.push(product);
      product_count++;
      if (product.alarm === true) {
        product_low_count++;
      }
    });
    $scope.products = products;
    $scope.inventory = product_count;
    $scope.products_low = product_low_count;
  });
});