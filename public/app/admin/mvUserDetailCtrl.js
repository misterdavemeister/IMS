angular.module('app').controller('mvUserDetailCtrl', function($scope, mvCachedUsers, $routeParams, mvUser, $location, mvNotifier, alertify) {
  mvCachedUsers.query().$promise.then(function(collection) {
    collection.forEach(function(user) {
      if (user._id === $routeParams.id) {
        $scope.user = user;
        console.log(user);
      }
    });
  });
  $scope.deleteUser = function(id, firstName, lastName) {
    alertify
      .okBtn("Yes")
      .cancelBtn("No")
      .confirm("Delete " + firstName + " " + lastName + "?", function () {
      mvUser.delete({_id: id}, function () {
        $scope.users = mvCachedUsers.reload();
        $location.path("/admin/users");
        mvNotifier.success("You have successfully deleted the user '" + firstName + " " + lastName + "'!");
        alertify
          .reset();
      });
    });
  };
});
