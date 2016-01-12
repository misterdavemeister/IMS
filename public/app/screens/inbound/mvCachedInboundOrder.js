angular.module('app').factory('mvCachedInboundOrder', function(mvInboundOrder) {
  var cachedInboundOrder;

  return {
    query: function() {
      if (!cachedInboundOrder) {
        cachedInboundOrder = mvInboundOrder.query();
      }
      return cachedInboundOrder;
    },
    reload: function() {
      cachedInboundOrder = mvInboundOrder.query();
      return cachedInboundOrder;
    }
  }
});