angular.module('app').controller('mvProductsScreenCtrl', function($scope, mvCachedProduct, mvIdentity) {
  $scope.products = mvCachedProduct.query();
  $scope.identity = mvIdentity;
  $scope.title = "Products";
  $scope.css = "product-header";

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
