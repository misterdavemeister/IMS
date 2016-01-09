angular.module('app').controller('mvMainProductsCtrl', function($scope, mvCachedProduct) {
  var product_count = 0,
      products = [];

  mvCachedProduct.query().$promise.then(function(collection) {
    collection.forEach(function(product) {
      products.push(product);
      product_count++;
      if (product.product_id === 100001) {
        $scope.example = product.locations[0].name;
      }
    });
    $scope.products = products;
    $scope.inventory = product_count;
  });
});