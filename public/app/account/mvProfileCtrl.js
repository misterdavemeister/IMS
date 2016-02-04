angular.module('app').controller('mvProfileCtrl', function($scope, mvAuth, mvIdentity, mvNotifier, $location, $routeParams, mvCachedUsers) {
  mvCachedUsers.query().$promise.then(function(collection) {
    collection.forEach(function(user) {
      if (user._id === $routeParams.id) {
        $scope.user = user;
        $scope.username = $scope.user.username;
        $scope.fname = $scope.user.firstName;
        $scope.lname = $scope.user.lastName;
      }
    });
  });

  $scope.update = function() {
    var newUserData = {
      username : $scope.username,
      firstName: $scope.fname,
      lastName : $scope.lname
    };

    if ($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
      console.log('password saved to newUserData object in mvProfileCtrl.js: ' + $scope.password);
    }
    if (mvIdentity.currentUser._id === $routeParams.id) {
      mvAuth.updateCurrentUser(newUserData).then(function (user) {
        mvNotifier.success('Your user account has been updated');
//        console.log(user);
        $scope.users = mvCachedUsers.reload();
        $location.path('/');
      }, function (reason) {
        mvNotifier.error(reason);
      });
    }
    else {
      mvAuth.updateUser(newUserData, $scope.user).then(function (user) {
        mvNotifier.success('Account successfully updated');
//        console.log(user);
        $scope.users = mvCachedUsers.reload();
        $location.path('/');
      }, function (reason) {
        mvNotifier.error(reason);
      });
    }
  };
});
