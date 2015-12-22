angular.module('app').controller('mvMainCtrl', function($scope, mvIdentity) {
  /*
  mvCachedCourses for cached version
  mvCourse for noncached version
   */
//  $scope.courses = mvCachedCourses.query();
  $scope.identity = mvIdentity;
});
