angular.module('app').controller('mvUserListCtrl', function($scope, mvCachedUsers, mvIdentity, $location) {
   $scope.identity = mvIdentity;
   $scope.users = mvCachedUsers.query();
   $scope.title = "Users";
   $scope.alarm = false;
   $scope.alarm_at = 1000;
   $scope.activeTab = 1;

   $scope.buttons = [{url: "/admin/users",
      text:'Users',
      auth:'admin',
      id: 1,
      click: function(id) {
        $scope.activeTab = id;
        $location.path(this.url);
        console.log("went to " + this.url);
      },
      isCurrent: function(id) {
        return $scope.activeTab === id;
      }
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
