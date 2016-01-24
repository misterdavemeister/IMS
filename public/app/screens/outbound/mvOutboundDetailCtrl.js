angular.module('app').controller('mvOutboundDetailCtrl', function($scope, mvCachedOutboundOrder, $routeParams, mvOutboundOrder, mvIdentity) {
  mvCachedOutboundOrder.query().$promise.then(function(collection) {
    $scope.orders = collection;
    collection.forEach(function(outboundOrder) {
      if (outboundOrder._id === $routeParams.id) {
        $scope.currentItem = new mvOutboundOrder(outboundOrder);
        $scope.order = outboundOrder;
        $scope.heading = 'Details for Outbound Order ' + $scope.order.orderNumber;
        $scope.identity = mvIdentity;
        $scope.backUrl = '/screens/outbound';
        $scope.backUrlText = 'Outbound';
        $scope.cssClass = 'outbound-header';
      }
    });
  });
});