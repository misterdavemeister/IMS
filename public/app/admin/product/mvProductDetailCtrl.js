angular.module('app').controller('mvProductDetailCtrl', function($scope, $routeParams, $location, mvCachedProduct, mvProductAdmin, mvNotifier, mvProduct) {
 mvCachedProduct.query().$promise.then(function(collection) {
   collection.forEach(function(product) {
     if (product._id === $routeParams.id) {
       $scope.product = new mvProduct(product);
       for(var p in product) {
         $scope[p] = product[p];
       }
     }
   });
 });
 $scope.update = function(product) {
   $scope.product = product;
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
     $location.path('/screens/products');
   }, function (reason) {
     mvNotifier.error(reason);
   });
 };
});