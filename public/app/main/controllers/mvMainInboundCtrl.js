angular.module('app').controller("mvMainInboundCtrl", function($scope, mvCachedInboundOrder) {
  var openCount = 0;

  $scope.inboundOrders = mvCachedInboundOrder.query();
  $scope.inboundOrders.$promise.then(function(collection) {
    collection.forEach(function(order) {
      if (order.status === 'Open') {
        openCount++;
      }
    });
    $scope.inboundOrdersAmount = openCount;
  })
});