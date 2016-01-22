angular.module('app').controller('mvInboundDetailCtrl', function($scope, $routeParams, mvCachedInboundOrder, mvIdentity, mvInboundOrderAdmin, mvNotifier, alertify, $location, mvInboundOrder) {
  mvCachedInboundOrder.query().$promise.then(function(collection) {
    collection.forEach(function(order) {
      if (order._id === $routeParams.id) {
        $scope.currentItem = new mvInboundOrder(order);
        $scope.order = order;
        $scope.heading = 'Details for Inbound Order ' + $scope.order.orderNumber;

        //Buttons
        $scope.activeTab = 1;
        $scope.buttons = [
          {
            url: "/admin/inbound/" + order._id,
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
          { url:"/screens/inbound/receive/" + order._id,
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

          { url:"/screens/inbound/order/edit/" + order._id,
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

          { url:"/admin/product/" + order._id,
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
      }
    });
  });
  $scope.identity = mvIdentity;
  $scope.backUrl = '/screens/inbound';
  $scope.backUrlText = 'Inbound';
  $scope.cssClass = 'inbound-header';

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