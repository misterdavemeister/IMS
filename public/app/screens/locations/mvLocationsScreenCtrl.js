angular.module('app').controller('mvLocationsScreenCtrl', function($scope, mvIdentity, mvCachedLocation) {
  this.name = "mvLocationsScreenCtrl";
  //console.log("You are in: " + this.name);
  $scope.title = "Locations";
  $scope.cssClass = "locations-header";
});
