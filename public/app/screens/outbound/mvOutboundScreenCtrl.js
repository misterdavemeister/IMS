angular.module('app').controller('mvOutboundScreenCtrl', function($scope) {
  this.name = "mvOutboundScreenCtrl";
  //console.log("You are in: " + this.name);
  $scope.title = "Outbound";
  $scope.cssClass = ["outbound-header"];
});
