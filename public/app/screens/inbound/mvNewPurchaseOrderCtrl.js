angular.module('app').controller('mvNewPurchaseOrderCtrl', function($scope, $routeParams, $http, $location, mvCachedProduct, mvIdentity, mvInboundOrderAdmin, mvNotifier, mvCachedInboundOrder) {
/* FOR LIST OF AVAILABLE PRODUCTS?
 <input type="search" class="form-control" placeholder="Filter user groups" results="0" ng-model="searchText" />

 <select class="form-control"
 size="8"
 multiple
 ng-model="UserGroupsSelected"
 ng-options="userGroup.Id as (userGroup.Name | filter:searchText) for userGroup in AvailableUserGroups" >
 */

  $scope.identity = mvIdentity;
  $scope.productsToOrder = [];
  $scope.orderCount = 0;
  $scope.adding = false;
  $scope.quant = 0;
  $scope.total = 0;
  $scope.checkbox = false;
  $scope.checkboxCount = 0;
  $scope.uniqueOrderNumber = undefined;

  //Button Tabs
  $scope.active = 2;
  $scope.buttons = [{
    url:"/screens/inbound",
    text:'Inbound',
    auth: 'user',
    id: 1,
    click    : function (id) {
      $scope.adding = false;
      $scope.active = id;
      $location.path(this.url);
    },
    isCurrent: function (id) {
      return $scope.active === id;
    }
  },
  {
    url:"/screens/inbound/order",
    text:'New Purchase Order',
    auth: 'user',
    id: 2,
    click    : function (id) {
      $scope.adding = false;
      $scope.active = id;
      $location.path(this.url);
    },
    isCurrent: function (id) {
      return $scope.active === id;
    }
  },
    {
      url: "/screens/inbound/receive",
      text: "Receive Product",
      auth: 'user',
      id: 3,
      click    : function (id) {
        $scope.adding = false;
        $scope.active = id;
        $location.path(this.url);
      },
      isCurrent: function (id) {
        return $scope.active === id;
      }
    }];

  $scope.orders = mvCachedInboundOrder.query();
  $scope.orders.$promise.then(function(collection) {
    collection.forEach(function(order) {
      if (order._id === $routeParams.id) {
        $scope.orderToEdit = order;
        $scope.productsToOrder = [];
        $scope.orderToEdit.products.forEach(function(productInOrderToEdit) {
          $scope.addProduct(productInOrderToEdit.product, productInOrderToEdit);
        });
      }
    });
    $scope.uniqueOrderNumber = generateUniqueOrderID();
  });

  mvCachedProduct.query().$promise.then(function (collection) {
    $scope.products = collection;
    $scope.productOptions = [];
    if ($routeParams.id) {
      collection.forEach(function (product) {
        $scope.productOptions.push(product);
        if (product._id === $routeParams.id) {
          $scope.addProduct(product);
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
    $location.path('/screens/inbound');
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

  $scope.addProduct = function(product, order) {
    var quantity = 0,
        totalPerLine = 0;
    if (order !== undefined) {
      quantity = Number(order.quantityOpen);
      totalPerLine = Math.round(product.price * quantity * 100) / 100;
    }
    $scope.orderCount++;
    $scope.productsToOrder.push({
      lineNo: $scope.orderCount,
      name: product.name,
      upc: product.upc,
      product_id: product.product_id,
      price: product.price,
      manufacturer: product.manufacturer,
      quantity: quantity,
      totalPerLine: totalPerLine,
      selectForDelete: false,
      originalObj: product
    });
    $scope.recalculate(product, quantity);
  };

  $scope.toggleIsAdding = function() {
    $scope.adding = !$scope.adding;
  };

  $scope.isAdding = function() {
    return $scope.adding;
  };

  $scope.placeOrder = function(productsToOrder) {
    // Sequence of products within order is tracked with unique number...
    // ...which is the order number + '_seq_' + 1, 2, 3, etc

    var products = [],
        totalUnits = 0,
//        orderNumber = generateUniqueOrderID(),
        sequence = 0;

    productsToOrder.forEach(function(product) {
      sequence++;
      totalUnits += Number(product.quantity);
      products.push({
        sequence: $scope.uniqueOrderNumber.toString() + '_seq_' + sequence.toString(),
        name: product.name,
        quantity: product.quantity,
        quantityOpen: product.quantity,
        product: product.originalObj._id
      });
    });

    var inboundOrderData = {
      orderNumber: $scope.uniqueOrderNumber,
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

  $scope.updateOrder = function(productsToOrder) {
    var products = [],
        totalUnits = 0,
        orderNumber = $scope.orderToEdit.orderNumber,
        sequence = 0;

    productsToOrder.forEach(function(product) {
      sequence++;
      totalUnits += Number(product.quantity);
      products.push({
                      sequence: orderNumber.toString() + '_seq_' + sequence.toString(),
                      name: product.name,
                      quantity: product.quantity,
                      quantityOpen: product.quantity,
                      product: product.originalObj._id
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
      mvInboundOrderAdmin.updateOrder(inboundOrderData, $scope.orderToEdit).then(function() {
        mvCachedInboundOrder.reload();
        mvNotifier.success('You successfully placed an order!');
        $location.path('/admin/inbound/' + $scope.orderToEdit._id);
      }, function(reason) {
        mvNotifier.error(reason);
      });
    });
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