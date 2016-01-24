angular.module('app').factory('mvCachedOutboundOrder', function(mvOutboundOrder) {
  var cachedOutboundOrder;
  return {
    query: function() {
      if (!cachedOutboundOrder) {
        cachedOutboundOrder = mvOutboundOrder.query();
      }
      return cachedOutboundOrder;
    },
    reload: function() {
      cachedOutboundOrder = mvOutboundOrder.query();
      return cachedOutboundOrder;
    }
  }
});