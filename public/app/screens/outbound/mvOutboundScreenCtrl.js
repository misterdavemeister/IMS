angular.module('app').controller('mvOutboundScreenCtrl', function($scope, $location, mvIdentity, mvCachedOutboundOrder) {
  $scope.identity = mvIdentity;
  $scope.outboundOrders = mvCachedOutboundOrder.query();
  $scope.title = "Outbound";
  $scope.cssClass = "outbound-header";

  //Button Tabs
  $scope.active = 1;
  $scope.buttons = [{
    url:"/screens/outbound",
    text:'Outbound',
    auth: 'user',
    id: 1,
    click    : function (id) {
      $scope.active = id;
      $location.path(this.url);
    },
    isCurrent: function (id) {
      return $scope.active === id;
    }
  },
                    {
                      url:"/screens/outbound/order",
                      text:'Create Quote',
                      auth: 'user',
                      id: 2,
                      click    : function (id) {
                        $scope.active = id;
                        $location.path(this.url);
                      },
                      isCurrent: function (id) {
                        return $scope.active === id;
                      }
                    }, {
      url: "/screens/outbound/receive",
      text: "Ship Order",
      auth: 'user',
      id: 3,
      click    : function (id) {
        $scope.active = id;
        $location.path(this.url);
      },
      isCurrent: function (id) {
        return $scope.active === id;
      }
    }];

  $scope.searchOptions = [{value:'', text:'Search by Any'},
                          {value:'placedBy.username', text:'Search by User'},
                          {value:'orderNumber', text:'Search by Order Number'},
                          {value:'status', text:'Search by Status'},
                          {value:'totalCost', text:'Search by Cost'}
  ];
  $scope.sortOptions = [{value:'orderNumber', text:'Sort by Order Number'},
                        {value:'placedBy.username', text:'Sort by User'},
                        {value:'status', text:'Sort by Status'},
                        {value:'totalCost', text:'Sort by Cost'},
                        {value:'-placedBy.username', text:'Sort by User'},
                        {value:'-orderNumber', text:'Sort by Order Number'},
                        {value:'-status', text:'Sort by Status'},
                        {value:'-totalCost', text:'Sort by Cost'}
  ];
  $scope.searchOpt = $scope.searchOptions[0].value;
  $scope.sortOrder = $scope.sortOptions[6].value;
});
