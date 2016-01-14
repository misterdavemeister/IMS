angular.module('app').factory('mvLoad', function($resource) {
  var LoadResource = $resource('/api/loads/:id', {_id: '@id'}, {
    update: {method: 'PUT', isArray: false}
  });
  return LoadResource;
});