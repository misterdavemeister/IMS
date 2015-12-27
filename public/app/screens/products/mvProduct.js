angular.module('app').factory('mvProduct', function($resource) {
  var ProductResource = $resource('/api/products/:_id', {_id: "@id"}, {
    update: {method: 'PUT', isArray: false}
  });
  return ProductResource;
});