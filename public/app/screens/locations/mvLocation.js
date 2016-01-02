angular.module('app').factory('mvLocation', function($resource) {
  var LocationResource = $resource('/api/locations/:_id', {_id: '@id'}, {
    update: {method: 'PUT', isArray: false}
  });
  return LocationResource;
});