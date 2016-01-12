angular.module('app').controller('mvInboundScreenCtrl', function($scope, mvCachedInboundOrder) {
  $scope.inboundOrders = mvCachedInboundOrder.query();
  $scope.title = "Inbound";
  $scope.cssClass = "inbound-header";

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
