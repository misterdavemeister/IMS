angular.module('app').factory('mvOutboundOrder', function($resource) {
  var OutboundResource = $resource('/api/sales/:_id', {_id:"@id"}, {
    update: {method:'PUT', isArray: false}
  });
  return OutboundResource;
});