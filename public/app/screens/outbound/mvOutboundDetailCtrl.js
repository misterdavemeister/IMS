angular.module('app').controller('mvOutboundDetailCtrl', function($scope, mvCachedOutboundOrder, $routeParams, mvOutboundOrder, mvIdentity, $location, alertify) {
  mvCachedOutboundOrder.query().$promise.then(function(collection) {
    $scope.orders = collection;
    collection.forEach(function(outboundOrder) {
      if (outboundOrder._id === $routeParams.id) {
        $scope.currentItem = new mvOutboundOrder(outboundOrder);
        $scope.order = outboundOrder;
        $scope.heading = 'Details for Outbound Order ' + $scope.order.orderNumber;
        $scope.identity = mvIdentity;
        $scope.backUrl = '/screens/outbound';
        $scope.backUrlText = 'Outbound';
        $scope.cssClass = 'outbound-header';
      }
    });
    //Button Tabs

    $scope.activeTab = 1;
    $scope.buttons = [
      {
        url: "/admin/inbound/" + $scope.order._id,
        text: "Order Details",
        auth: 'user',
        id: 1,
        click: function(id) {
          $scope.activeTab = id;
          $location.path(this.url);
        },
        isCurrent: function(id) {
          return $scope.activeTab === id;
        }
      },
      { url:"/screens/inbound/receive/" + $scope.order._id,
        text:'Receive Order',
        auth: 'user',
        id: 2,
        click: function(id, order) {
          $scope.activeTab = id;
          console.log("Ordering " + order.name);
          $location.path(this.url);
        },
        isCurrent: function() {
          return this.current;
        }
      },

      { url:"/screens/inbound/order/edit/" + $scope.order._id,
        text:'Edit Order',
        auth: 'admin',
        id: 3,
        click: function(id) {
          $scope.activeTab = id;
          $location.path(this.url);
        },
        isCurrent: function() {
          return this.current;
        }
      },

      { url:"/admin/product/" + $scope.order._id,
        text:'Delete Order',
        auth: 'admin',
        id: 4,
        click: function(id, order) {
          $scope.activeTab = id;
          console.log(order);
          deleteOrder(order);
        },
        isCurrent: function() {
          return this.current;
        }
      }];
  });
  var deleteOrder = function(order) {
    var id = order._id,
        orderNumber = order.orderNumber;
    alertify
      .okBtn("Yes")
      .cancelBtn("No")
      .confirm("Delete order number " +orderNumber+ "?", function () {
        mvInboundOrder.delete({_id: id}, function () {
          $scope.products = mvCachedInboundOrder.reload();
          $location.path("/screens/inbound/");
          mvNotifier.success("You have successfully deleted the product '" + name + "'!");
          alertify
            .reset();
        });
      });
  };
});