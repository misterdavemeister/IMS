angular.module('app').controller('mvUserAddCtrl', function($scope, $location, mvNotifier, mvAuth, mvCachedUsers) {
  $scope.addUser = function() {
    var newUserData = {
      username: $scope.username,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    };

    mvAuth.createUser(newUserData).then(function() {
      $scope.users = mvCachedUsers.reload();
      mvNotifier.success("User account created!");
      $location.path('/admin/users');
    }, function(reason) {
      mvNotifier.error(reason);
    });
  };
});