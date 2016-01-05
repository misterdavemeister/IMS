angular.module('app').controller('mvNewPurchaseOrderCtrl', function($scope, $routeParams, mvCachedProduct) {
/* FOR LIST OF AVAILABLE PRODUCTS?
 <input type="search" class="form-control" placeholder="Filter user groups" results="0" ng-model="searchText" />

 <select class="form-control"
 size="8"
 multiple
 ng-model="UserGroupsSelected"
 ng-options="userGroup.Id as (userGroup.Name | filter:searchText) for userGroup in AvailableUserGroups" >
 */
  mvCachedProduct.query().$promise.then(function (collection) {
    $scope.products = collection;
    $scope.productOptions = [];
    if ($routeParams.id) {
      collection.forEach(function (product) {
        $scope.productOptions.push(product);
        if (product._id === $routeParams.id) {
          $scope.name = product.name;
          $scope.upc = product.upc;
          $scope.product_id = product.product_id;
          $scope.price = product.price;
          $scope.manufacturer = product.manufacturer;
        }
        $scope.selectedProduct = "select a product";
      });
    }
  });
  $scope.showPurchaseOrder = function() {
    console.log($scope.name);
    console.log($scope.quantity);
  };
  $scope.cancel = function() {
    $scope.name = "HI";
    $scope.upc = "HI";
    $scope.product_id = "HI";
    $scope.price = "HI";
    $scope.manufacturer = "HI";
  };
});