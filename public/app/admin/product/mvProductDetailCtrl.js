angular.module('app').controller('mvProductDetailCtrl', function($scope, $routeParams, $location, mvCachedProduct, mvProductAdmin, mvNotifier, mvProduct, alertify) {
// For product details page
  mvCachedProduct.query().$promise.then(function(collection) {
    collection.forEach(function(product) {
      if (product._id === $routeParams.id) {
        $scope.currentItem = new mvProduct(product);
        for(var p in product) {
          $scope[p] = product[p];
        }
        // FOR LIST-ITEMS TEMPLATE //
        $scope.backUrl = "/screens/products";
        $scope.backUrlText = "Products";
        $scope.heading = product.name;
        $scope.buttons = [
          { url:"",
            text:'Order Product'
          },

          { url:"/admin/product/edit/" + product._id,
            text:'Edit Product',
            func: function() {
            }
          },

          { url:"/admin/product/" + product._id,
            text:'Delete Product' ,
            func: function() {
              deleteProduct(product);
            }
          }
        ];
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

  var deleteProduct = function(product) {
    var id = product._id,
        name = product.name;
    alertify
      .okBtn("Yes")
      .cancelBtn("No")
      .confirm("Delete " +name+ "?", function () {
        mvProduct.delete({_id: id}, function () {
          $scope.products = mvCachedProduct.reload();
          $location.path("/screens/products/");
          mvNotifier.success("You have successfully deleted the product '" + name + "'!");
          alertify
            .reset();
        });
      });
  }
});