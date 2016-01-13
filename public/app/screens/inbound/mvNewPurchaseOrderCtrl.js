angular.module('app').controller('mvNewPurchaseOrderCtrl', function($scope, $routeParams, $http, $location, mvCachedProduct, mvIdentity, mvInboundOrderAdmin, mvNotifier, mvCachedInboundOrder) {
/* FOR LIST OF AVAILABLE PRODUCTS?
 <input type="search" class="form-control" placeholder="Filter user groups" results="0" ng-model="searchText" />

 <select class="form-control"
 size="8"
 multiple
 ng-model="UserGroupsSelected"
 ng-options="userGroup.Id as (userGroup.Name | filter:searchText) for userGroup in AvailableUserGroups" >
 */
  $scope.orders = mvCachedInboundOrder.query();
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

  function generateUniqueOrderID() {
    var test = 100001,
        orderNumberArray = [];

    $scope.orders.forEach(function(order) {
      orderNumberArray.push(order.orderNumber.toString());
    });

    while (orderNumberArray.indexOf(test.toString()) !== -1) {
      test++;
    }

    return test;
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
    $location.path('/');
  };

  $scope.recalculate = function(product, quantity) {
    var price = product.price,
        total = Math.round(price * quantity * 100) / 100;
    if (total > 0) {
      product.quantity = quantity;
      product.totalPerLine = total > 0 ? total : 0;
    } else {
      product.quantity = 0;
      product.totalPerLine = 0;
    }
    $scope.total = recalculateTotal();
  };

  $scope.addProduct = function(product) {
    $scope.orderCount++;
    $scope.productsToOrder.push({
      lineNo: $scope.orderCount,
      name: product.name,
      upc: product.upc,
      product_id: product.product_id,
      price: product.price,
      manufacturer: product.manufacturer,
      quantity: 0,
      totalPerLine: 0,
      selectForDelete: false,
      originalObj: product
    });
  };

  $scope.toggleIsAdding = function() {
    $scope.adding = !$scope.adding;
  };

  $scope.isAdding = function() {
    return $scope.adding;
  };

  $scope.placeOrder = function(productsToOrder) {
    var products = [],
        totalUnits = 0,
        orderNumber = generateUniqueOrderID();
    productsToOrder.forEach(function(product) {
      totalUnits += Number(product.quantity);
      products.push({
        name: product.name,
        quantity: product.quantity,
        quantityOpen: product.quantity,
        product: product.originalObj._id
      });
    });
    var inboundOrderData = {
      orderNumber: orderNumber,
      created: Date.now,
      placedBy: {
        firstName: mvIdentity.currentUser.firstName,
        lastName: mvIdentity.currentUser.lastName,
        username: mvIdentity.currentUser.username,
        user: mvIdentity.currentUser._id
      },
      products: products,
      totalCost: $scope.total,
      totalUnits: totalUnits,
      status: 'Open'
    };
    mvInboundOrderAdmin.createInboundOrder(inboundOrderData).then(function(order) {
      mvCachedInboundOrder.reload();
      mvNotifier.success('You successfully placed an order!');
      $location.path('/admin/inbound/' + order._id);
    }, function(reason) {
      mvNotifier.error(reason);
    });
    //supplier
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