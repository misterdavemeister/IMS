angular.module('app').controller('mvProductDetailCtrl', function($scope, $routeParams, $location, mvCachedProduct, mvProductAdmin, mvNotifier, mvProduct, mvIdentity, alertify) {
  $scope.identity = mvIdentity;
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
        $scope.locations = product.locations[0].name;
        $scope.buttons = [
          { url:"/screens/inbound/order/" + product._id,
            text:'Order Product',
            auth: 'user',
            func: function(product) {
              console.log("Ordering " + product.name)
            }
          },

          { url:"/admin/product/edit/" + product._id,
            text:'Edit Product',
            auth: 'admin',
            func: function() {
            }
          },

          { url:"/admin/product/" + product._id,
            text:'Delete Product' ,
            auth: 'admin',
            func: function() {
              deleteProduct(product);
            }
          }];
      }
    });
  });

  $scope.approved = function(key) {
    console.log(key);
   if (key === 'locations') return false;
    else return true;
  };

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
  };
});