angular.module('app').factory('mvInboundOrderAdmin', function($q, mvInboundOrder) {
  return {
    createInboundOrder: function (inboundOrderData) {
      var newInboundOrder = new mvInboundOrder(inboundOrderData);
      var dfd             = $q.defer();

      newInboundOrder.$save().then(function (response) {
        dfd.resolve(response);
      }, function (response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    updateOrder: function (inboundOrderData, order) {
      var dfd   = $q.defer();
      var clone = angular.copy(order);

      angular.extend(clone, inboundOrderData);
      clone.$update().then(function () {
        dfd.resolve();
      }, function (response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    }
  }
});