angular.module('app').controller("mvMainInboundCtrl", function($scope, mvCachedInboundOrder) {
  $scope.inboundOrders = mvCachedInboundOrder.query();
  $scope.inboundOrders.$promise.then(function(collection) {
    $scope.inboundOrdersAmount = collection.length;
  })
});