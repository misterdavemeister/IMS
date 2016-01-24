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
        $scope.cssClass = 'product-header';

        //Buttons
        if (!$scope.activeTab) {
          $scope.activeTab = 1;
        }
        $scope.buttons = [
          {
            url: "/admin/product/" + product._id,
            text: "Product Details",
            auth: 'user',
            id: 1,
            click: function(id) {
              $scope.activeTab = id;
              $location.path(this.url);
            },
            isCurrent: function(id) {
              return $scope.activeTab === id;
            }
          },
          { url:"/screens/inbound/order/" + product._id,
            text:'Order Product',
            auth: 'user',
            id: 2,
            click: function(id, product) {
              $scope.activeTab = id;
              console.log("Ordering " + product.name)
              $location.path(this.url);
            },
            isCurrent: function() {
              return this.current;
            }
          },

          { url:"/admin/product/edit/" + product._id,
            text:'Edit Product',
            auth: 'admin',
            id: 3,
            click: function(id) {
              $location.path(this.url);
              $scope.activeTab = id;
            },
            isCurrent: function() {
              return this.current;
            }
          },

          { url:"/admin/product/" + product._id,
            text:'Delete Product',
            auth: 'admin',
            id: 4,
            click: function(id, product) {
              $scope.activeTab = id;
              deleteProduct(product);
            },
            isCurrent: function() {
              return this.current;
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
      manufacturer: $scope.manufacturer,
      alarm       : $scope.alarm,
      alarm_at    : $scope.alarm_at
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