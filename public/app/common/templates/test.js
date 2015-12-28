angular.module('app').controller('test', function($scope, mvCachedProduct, mvIdentity, $location) {
  $scope.title = "Products";
  mvCachedProduct.query().$promise.then(function(collection){
    $scope.products = [];
    collection.forEach(function(product) {
      $scope.products.push(product);
    });
  });

  $scope.identity = mvIdentity;

  $scope.sortOptions = [{value:'name', text:'Sort by Product Name'},
                        {value:'description', text:'Sort by Product Description'},
                        {value:'upc', text:'Sort by Product UPC'},
                        {value:'product_id', text:'Sort by Product ID'},
                        {value:'quantity', text:'Sort by Quantity'},
                        {value:'price', text:'Sort by Price'},
                        {value:'manufacturer', text:'Sort by Manufacturer'}
  ];
  $scope.sortOrder = $scope.sortOptions[0].value;
});