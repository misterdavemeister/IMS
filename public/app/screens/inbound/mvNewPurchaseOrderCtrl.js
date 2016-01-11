angular.module('app').controller('mvNewPurchaseOrderCtrl', function($scope, $routeParams, $http, mvCachedProduct) {
/* FOR LIST OF AVAILABLE PRODUCTS?
 <input type="search" class="form-control" placeholder="Filter user groups" results="0" ng-model="searchText" />

 <select class="form-control"
 size="8"
 multiple
 ng-model="UserGroupsSelected"
 ng-options="userGroup.Id as (userGroup.Name | filter:searchText) for userGroup in AvailableUserGroups" >
 */
  $scope.productsToOrder = [];
  $scope.orderCount = 0;
  $scope.adding = false;
  $scope.quant = 0;
  $scope.total = 0;
  $scope.checkbox = false;
  $scope.checkboxCount = 0;

  mvCachedProduct.query().$promise.then(function (collection) {
    $scope.products = collection;
    $scope.productOptions = [];
    if ($routeParams.id) {
      collection.forEach(function (product) {
        $scope.productOptions.push(product);
        if (product._id === $routeParams.id) {
          $scope.addProduct(product);
//          $scope.productsToOrder.push(product);
//          $scope.name = product.name;
//          $scope.upc = product.upc;
//          $scope.product_id = product.product_id;
//          $scope.price = product.price;
//          $scope.manufacturer = product.manufacturer;
        }
      });
    }
  });
  function recalculateTotal() {
    var total = 0;
    $scope.productsToOrder.forEach(function(product) {
      total += product.totalPerLine;
    });
    return total;
  }
  $scope.isChecked = function() {
    return $scope.checkbox;
  };
  $scope.updateCheckboxes = function(product, checkbox) {
    checkbox == false ? $scope.checkboxCount-- : $scope.checkboxCount++;
    product.selectForDelete = checkbox;
    $scope.checkbox = $scope.checkboxCount > 0;
  };
  $scope.log = function(arg) {
    console.log(arg);
  };
  $scope.cancel = function() {
    $scope.name = "HI";
    $scope.upc = "HI";
    $scope.product_id = "HI";
    $scope.price = "HI";
    $scope.manufacturer = "HI";
  };
  $scope.recalculate = function(product, quantity) {
    var price = product.price,
        total = Math.round(price * quantity * 100) / 100;
    product.totalPerLine = total > 0 ? total : 0;
    $scope.total = recalculateTotal();
  };
  $scope.addProduct = function(product) {
    console.log("ADDING");
    $scope.orderCount++;
    $scope.productsToOrder.push({
      lineNo: $scope.orderCount,
      name: product.name,
      upc: product.upc,
      product_id: product.product_id,
      price: product.price,
      manufacturer: product.manufacturer,
      totalPerLine: 0,
      selectForDelete: false
    });
  };
  $scope.toggleIsAdding = function() {
    $scope.adding = !$scope.adding;
  };
  $scope.isAdding = function() {
    return $scope.adding;
  };
  $scope.placeOrder = function(productsToOrder) {
    console.log(productsToOrder);
  };
  $scope.deleteCheckedLines = function() {
    var marked = [];
    $scope.productsToOrder.forEach(function(product, index) {
      if (product.selectForDelete === true) {
        marked.push(index);
      }
    });
    for (var i = marked.length - 1; i >= 0; i--) {
      $scope.productsToOrder.splice(marked[i], 1);
    }
    $scope.checkboxCount = 0;
    $scope.checkbox = false;
    $scope.total = recalculateTotal();
  };
});