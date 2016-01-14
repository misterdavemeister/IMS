angular.module('app').controller('mvReceivingCtrl', function($scope, $location, mvCachedInboundOrder, mvCachedLocation, mvLoadAdmin, mvCachedLoad, mvNotifier) {
  $scope.openOrders = [];
  $scope.orders = [];
  $scope.locations = [];
  $scope.isViewingOrders = true;
  $scope.receiving = false;

  mvCachedLocation.query().$promise.then(function(collection) {
    $scope.locations = collection;
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
    var loadData = {
      loadId: $scope.load,
      productName: $scope.productToReceive.name,
      quantity: $scope.quantity,
      locationName: $scope.location.name,
      product: $scope.productToReceive,
      location: $scope.location
    };
    mvLoadAdmin.createLoad(loadData).then(function(load) {
      mvCachedLoad.reload();
      mvNotifier.success('Successfully received stock to load: ' + load._id);
      $location.path('/');
    }, function(reason) {
      mvNotifier.error(reason);
    });
  };
});