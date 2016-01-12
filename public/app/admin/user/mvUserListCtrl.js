angular.module('app').controller('mvUserListCtrl', function($scope, mvCachedUsers, mvIdentity) {
   $scope.identity = mvIdentity;
   $scope.users = mvCachedUsers.query();
   $scope.title = "Users";

   $scope.buttons = [{url: "/admin/user-add",
      text:'Add User',
      auth:'admin'
   }];

   $scope.searchOptions = [{value:'', text:'Search by Any'},
                           {value:'firstName', text:'Search by First Name'},
                           {value:'lastName', text:'Search by Last Name'},
                           {value:'username', text:'Search by Username'},
                           {value:'roles', text:'Search by Role'}
   ];

   $scope.sortOptions = [{value: 'firstName', text: 'Sort by First Name'},
                         {value: 'username', text: 'Sort by Username'},
                         {value: 'role', text: 'Sort by Role'},
                         {value: '-firstName', text: 'Sort by First Name (reversed)'},
                         {value: '-lastName', text: 'Sort by Last Name (reversed)' },
                         {value: '-role', text: 'Sort by Role (reversed)'}
   ];
   $scope.searchText = "";
   $scope.searchOpt = $scope.searchOptions[0].value;
   $scope.sortOrder = $scope.sortOptions[0].value;
});
