angular.module('app').controller('mvMainCtrl', function($scope, mvIdentity) {
  $scope.identity = mvIdentity;

  //for screens dropdown menu
  $scope.showInbound = false;
  $scope.toggleInbound = function() {
    $scope.showInbound = !$scope.showInbound;
  }
});
