angular.module('app').factory('mvCachedProduct', function(mvProduct) {
  var cachedProduct;

  return {
    query: function() {
      if (!cachedProduct) {
        cachedProduct = mvProduct.query();
      }
      return cachedProduct;
    },
    reload: function() {
      cachedProduct = mvProduct.query();
      return cachedProduct;
    }
  }
});