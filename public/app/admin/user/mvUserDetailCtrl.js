angular.module('app').controller('mvUserDetailCtrl', function($scope, mvCachedUsers, $routeParams, mvUser, $location, mvNotifier, alertify, mvIdentity) {
  $scope.identity = mvIdentity;

  mvCachedUsers.query().$promise.then(function(collection) {
    collection.forEach(function(user) {
      if (user._id === $routeParams.id) {
        $scope.currentItem = user;
        $scope.backUrl = "/admin/users";
        $scope.backUrlText = "Users";
        $scope.heading = user.firstName + ' ' + user.lastName;

        $scope.activeTab = 1;
        $scope.buttons = [
          {
            url:"/admin/user/" + user._id,
            text:'User Details',
            auth: 'admin',
            id: 1,
            click: function(id) {
              $scope.activeTab = id;
              $location.path(this.url);
            },
            isCurrent: function(id) {
              return $scope.activeTab === id;
            }
          },
          {
            url:"/admin/user/" + user._id,
            text:'Delete User',
            auth: 'admin',
            id: 2,
            click: function(id) {
              $scope.activeTab = id;
              deleteUser(user);
            },
            isCurrent: function(id) {
              return $scope.activeTab === id;
            }
          },
          {
            url: '/admin/user/edit/' + user._id,
            text:'Edit User',
            auth: 'admin',
            id: 3,
            click: function(id) {
              $scope.activeTab = id;
              $location.path(this.url);
            },
            isCurrent: function(id) {
              return $scope.activeTab === id;
            }
          }];
      }
    });
  });
  var deleteUser = function(user) {
    var id = user._id,
        firstName = user.firstName,
        lastName = user.lastName;
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
