angular.module('app').factory('mvProductAdmin', function($q, mvProduct) {
  return {
    createProduct: function(newProductData) {
      var newProduct = new mvProduct(newProductData);
      var dfd = $q.defer();

      newProduct.$save().then(function() {
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },

    updateProduct: function(newProductData, product) {
      var dfd = $q.defer();
      var clone = angular.copy(product);

      angular.extend(clone, newProductData);
      clone.$update().then(function() {
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    }
  };
});