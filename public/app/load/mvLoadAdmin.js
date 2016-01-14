angular.module('app').factory('mvLoadAdmin', function($q, mvLoad) {
  return {
    createLoad: function(loadData) {
      var newLoadData = new mvLoad(loadData);
      var dfd = $q.defer();

      newLoadData.$save().then(function(response) {
        dfd.resolve(response);
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    }
  }
});