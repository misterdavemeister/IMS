angular.module('app').controller('mvProductAddCtrl', function($scope, $location, mvCachedProduct, mvNotifier, mvProductAdmin){
  // FOR LIST-ITEMS TEMPLATE //
  $scope.backUrl = "/screens/products";
  $scope.backUrlText = "Products";
  $scope.heading = "Add Product";
  $scope.buttons = [{}];

  $scope.addProduct = function() {
    var newProductData = {
      name        : $scope.name,
      description : $scope.description,
      upc         : $scope.upc,
      product_id  : $scope.product_id,
      quantity    : $scope.quantity,
      price       : $scope.price,
      manufacturer: $scope.manufacturer
    };
    mvProductAdmin.createProduct(newProductData).then(function(product) {
      $scope.products = mvCachedProduct.reload();
      $scope.currentItem = product;
      mvNotifier.success("Product successfully added!");
      $location.path('/admin/product/' + $scope.currentItem._id);
    }, function(reason) {
      mvNotifier.error(reason);
    });
  };
});