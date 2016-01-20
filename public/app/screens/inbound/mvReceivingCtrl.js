angular.module('app').controller('mvReceivingCtrl', function($scope, $location, mvCachedInboundOrder, mvCachedLocation, mvLoadAdmin, mvCachedLoad, mvNotifier, mvIdentity) {
  //sort products to receive by whether or not they're open, make closed (received) products non-clickable
  $scope.identity = mvIdentity;
  $scope.openOrders = [];
  $scope.orders = [];
  $scope.locations = [];
  $scope.isViewingOrders = true;
  $scope.receiving = false;

  //Button Tabs
  $scope.active = 3;
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
  mvCachedLocation.query().$promise.then(function(collection) {
    $scope.locations = collection;
    $scope.location = $scope.locations[0];
  });

  mvCachedInboundOrder.query().$promise.then(function(collection) {
    $scope.orders = collection;
    collection.forEach(function(order) {
      if (order.status === 'Open') {
        $scope.openOrders.push(order);
      }
    });
  });

  $scope.viewOrder = function(order) {
    $scope.toggleViewOrders();
    $scope.orderToReceive = order;
  };

  $scope.toggleViewOrders = function() {
    $scope.isViewingOrders = !$scope.isViewingOrders;
  };

  $scope.receiveProduct = function(product) {
    $scope.receiving = true;
    $scope.productToReceive = product;
  };

  $scope.toggleIsReceiving = function() {
    $scope.receiving = !$scope.receiving;
  };

  $scope.isReceiving = function() {
    return $scope.receiving;
  };

  $scope.confirm = function() {
    //TODO: runChecks()
    //...check that quantity is <= order quantity
    var loadData = {
      loadId: $scope.load,
      productName: $scope.productToReceive.name,
      quantity: $scope.quantity,
      locationName: $scope.location.name,
      order: $scope.orderToReceive,
      orderLine: $scope.productToReceive,
      product: $scope.productToReceive.product,
      location: $scope.location
    };
    mvLoadAdmin.createLoad(loadData).then(function(load) {
      mvCachedLoad.reload();
      mvCachedInboundOrder.reload();
      mvNotifier.success('Created load on Load ID: ' + load.loadId);
      $location.path('/');
    }, function(reason) {
      mvNotifier.error(reason);
    });
  };
});