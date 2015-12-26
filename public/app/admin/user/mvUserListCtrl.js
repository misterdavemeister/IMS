angular.module('app').controller('mvUserListCtrl', function($scope, mvCachedUsers) {
   $scope.users = mvCachedUsers.query();

   $scope.sortOptions = [{value: 'firstName', text: 'Sort by First Name'},
      {value: 'lastName', text: 'Sort by Last Name' },
      {value: 'role', text: 'Sort by Role'}];

   $scope.sortOrder = $scope.sortOptions[0].value;
});
