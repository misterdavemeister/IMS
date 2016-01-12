angular.module('app').controller('mvInboundDetailCtrl', function($scope, $routeParams, mvCachedInboundOrder) {
  mvCachedInboundOrder.query().$promise.then(function(collection) {
    collection.forEach(function(order) {
      if (order._id === $routeParams.id) {
        $scope.order = order;
      }
    });
  });
});