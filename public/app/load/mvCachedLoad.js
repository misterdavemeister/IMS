angular.module('app').factory('mvCachedLoad', function(mvLoad) {
  var cachedLoad;

  return {
    query: function() {
      if (!cachedLoad) {
        cachedLoad = mvLoad.query();
      }
      return cachedLoad;
    },
    reload: function() {
      cachedLoad = mvLoad.query();
      return cachedLoad;
    }
  }
});