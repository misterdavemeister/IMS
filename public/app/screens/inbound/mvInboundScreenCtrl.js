angular.module('app').controller('mvInboundScreenCtrl', function($scope, mvIdentity, mvCachedInboundOrder) {
  $scope.identity = mvIdentity;
  $scope.inboundOrders = mvCachedInboundOrder.query();
  $scope.title = "Inbound";
  $scope.cssClass = "inbound-header";
  $scope.buttons = [{ url:"/screens/inbound/order",
    text:'New Purchase Order',
    auth: 'user',
    func: function(test) {
      console.log(test);
    }
  }];

  $scope.searchOptions = [{value:'', text:'Search by Any'},
                          {value:'placedBy.username', text:'Search by User'},
                          {value:'orderNumber', text:'Search by Order Number'},
                          {value:'status', text:'Search by Status'},
                          {value:'totalCost', text:'Search by Cost'}
  ];
  $scope.sortOptions = [{value:'placedBy.username', text:'Sort by User'},
                          {value:'orderNumber', text:'Sort by Order Number'},
                          {value:'status', text:'Sort by Status'},
                          {value:'totalCost', text:'Sort by Cost'},
                          {value:'-placedBy.username', text:'Sort by User'},
                          {value:'-orderNumber', text:'Sort by Order Number'},
                          {value:'-status', text:'Sort by Status'},
                          {value:'-totalCost', text:'Sort by Cost'}
  ];
  $scope.searchOpt = $scope.searchOptions[0].value;
  $scope.sortOrder = $scope.sortOptions[0].value;
});
