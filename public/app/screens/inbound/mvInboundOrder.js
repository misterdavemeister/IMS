angular.module('app').factory('mvInboundOrder', function($resource) {
  var InboundOrderResource = $resource('/api/orders/:_id', {_id: "@id"}, {
    update: {method: 'PUT', isArray: false}
  });
  return InboundOrderResource;
});