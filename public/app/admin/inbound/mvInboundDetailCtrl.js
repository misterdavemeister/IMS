angular.module('app').controller('mvInboundDetailCtrl', function($scope, $routeParams, mvCachedInboundOrder, mvIdentity) {
  mvCachedInboundOrder.query().$promise.then(function(collection) {
    collection.forEach(function(order) {
      if (order._id === $routeParams.id) {
        $scope.order = order;
        $scope.heading = 'Details for Inbound Order ' + $scope.order.orderNumber;
      }
    });
  });
  $scope.identity = mvIdentity;
  $scope.backUrl = '/screens/inbound';
  $scope.backUrlText = 'Inbound';
  $scope.cssClass = 'inbound-header';
});