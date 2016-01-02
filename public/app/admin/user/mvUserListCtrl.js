angular.module('app').controller('mvUserListCtrl', function($scope, mvCachedUsers, mvIdentity) {
   $scope.identity = mvIdentity;
   $scope.users = mvCachedUsers.query();
   $scope.title = "Users";

   $scope.buttons = [{url: "/admin/user-add",
      text:'Add User',
      auth:'admin'
   }];

   $scope.sortOptions = [{value: 'firstName', text: 'Sort by First Name'},
      {value: 'lastName', text: 'Sort by Last Name' },
      {value: 'role', text: 'Sort by Role'}];

   $scope.sortOrder = $scope.sortOptions[0].value;
});
