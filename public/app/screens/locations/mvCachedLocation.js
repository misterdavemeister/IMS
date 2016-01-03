angular.module('app').factory('mvCachedLocation', function(mvLocation) {
  var cachedLocation;

  return {
    query: function() {
      if (!cachedLocation) {
        cachedLocation = mvLocation.query();
      }
      return cachedLocation;
    },
    reload: function() {
      cachedLocation = mvLocation.query();
      return cachedLocation;
    }
  }
});