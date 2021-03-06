angular.module('app').controller('mvReceivingCtrl', function($scope, $location, $route, $routeParams, mvCachedInboundOrder, mvCachedLocation, mvLoadAdmin, mvCachedLoad, mvNotifier, mvIdentity, mvCachedProduct) {
  //sort products to receive by whether or not they're open, make closed (received) products non-clickable
  $scope.identity = mvIdentity;
  $scope.title = "Receive";
  $scope.cssClass= "inbound-header";
  $scope.openOrders = [];
  $scope.orders = [];
  $scope.locations = [];
  $scope.orderToReceive = undefined;
  $scope.productToReceive = undefined;
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
  // Table Bar "Order By"
  $scope.searchOptions = [{value:'', text:'Search by Any'},
                          {value:'placedBy.username', text:'Search by User'},
                          {value:'orderNumber', text:'Search by Order Number'},
                          {value:'status', text:'Search by Status'},
                          {value:'totalCost', text:'Search by Cost'}
  ];
  $scope.sortOptions = [{value:'orderNumber', text:'Sort by Order Number'},
                        {value:'created', text:'Sort by Date'},
                        {value:'totalUnits', text:'Sort by Number of Products'},
                        {value:'status', text:'Sort by Status'},
                        {value:'-orderNumber', text:'Sort by Order Number (reversed)'},
                        {value:'-created', text:'Sort by Date (reversed)'},
                        {value:'-totalUnits', text:'Sort by Number of Products (reversed)'},
                        {value:'-status', text:'Sort by Status (reversed)'}
  ];
  $scope.searchOpt = $scope.searchOptions[0].value;
  $scope.sortOrder = $scope.sortOptions[0].value;

  mvCachedLocation.query().$promise.then(function(collection) {
    $scope.locations = collection;
    $scope.location = $scope.locations[0];
  });

  mvCachedInboundOrder.query().$promise.then(function(collection) {
    $scope.orders = collection;
    collection.forEach(function(order) {
      if ($routeParams.id === order._id) {
        $scope.toggleViewOrders();
        $scope.orderToReceive = order;
      }
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
    $scope.toggleIsReceiving();
    //TODO: runChecks()
    //...check that quantity is <= order quantity && quantity is > 0
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
      mvCachedProduct.reload();
      mvCachedLocation.reload();
      mvNotifier.success('Created load on Load ID: ' + load.loadId);
      $location.path('screens/inbound/receive/' + $scope.orderToReceive._id);
      $route.reload();
    }, function(reason) {
      mvNotifier.error(reason);
    });
  };
});