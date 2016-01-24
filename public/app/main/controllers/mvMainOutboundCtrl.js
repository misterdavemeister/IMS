angular.module('app').controller("mvMainOutboundCtrl", function($scope, mvCachedOutboundOrder) {
  var orders = [];
  mvCachedOutboundOrder.query().$promise.then(function(collection) {
    orders = collection;
    $scope.sales = orders.length;
  });
});