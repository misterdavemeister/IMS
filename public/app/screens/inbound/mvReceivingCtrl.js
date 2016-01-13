angular.module('app').controller('mvReceivingCtrl', function($scope, mvCachedInboundOrder) {
  $scope.openOrders = [];
  $scope.isViewingOrders = true;

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
    $scope.receiving = product._id;
    console.log($scope.receiving);
  };

  $scope.isReceiving = function(id) {
    console.log(id);
    console.log($scope.receiving);
    return $scope.receiving === id;
  };
});