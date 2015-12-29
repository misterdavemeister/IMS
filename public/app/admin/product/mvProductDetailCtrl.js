angular.module('app').controller('mvProductDetailCtrl', function($scope, $routeParams, $location, mvCachedProduct, mvProductAdmin, mvNotifier, mvProduct) {
// For product details page
  mvCachedProduct.query().$promise.then(function(collection) {
    collection.forEach(function(product) {
      if (product._id === $routeParams.id) {
        $scope.currentItem = new mvProduct(product);
        for(var p in product) {
          $scope[p] = product[p];
        }
        $scope.backUrl = "/screens/products";
        $scope.backUrlText = "Products";
        $scope.heading = product.name;
        $scope.buttons = [{ url:"", text:'Order Product'},
                          { url:"/admin/product/edit/" + product._id, text:'Edit Product', func: function() {
                            console.log("function works");
                          } },
                          { url:"", text:'Delete Product'}];
      }
    });
  });

// For product edit page
  $scope.update = function(product) {
    $scope.currentItem = product;
    var newProductData = {
      name        : $scope.name,
      description : $scope.description,
      upc         : $scope.upc,
      product_id  : $scope.product_id,
      quantity    : $scope.quantity,
      price       : $scope.price,
      manufacturer: $scope.manufacturer
    };
    mvProductAdmin.updateProduct(newProductData, product).then(function () {
      mvNotifier.success("Product successfully updated!");
      $scope.products = mvCachedProduct.reload();
      $location.path('/admin/product/' + $scope.currentItem._id);
    },function (reason) {
     mvNotifier.error(reason);
    });
  };
});