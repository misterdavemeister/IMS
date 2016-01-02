angular.module('app').controller('mvProductsScreenCtrl', function($scope, mvCachedProduct, mvIdentity) {
  $scope.products = mvCachedProduct.query();
  $scope.identity = mvIdentity;
  $scope.title = "Products";
  $scope.cssClass = "product-header";

  $scope.buttons = [{ url:"/admin/product/add",
      text:'Add Product',
      auth: 'admin'
    }];

  $scope.sortOptions = [{value:'name', text:'Sort by Product Name'},
    {value:'description', text:'Sort by Product Description'},
    {value:'upc', text:'Sort by Product UPC'},
    {value:'product_id', text:'Sort by Product ID'},
    {value:'quantity', text:'Sort by Quantity'},
    {value:'price', text:'Sort by Price'},
    {value:'manufacturer', text:'Sort by Manufacturer'},
    {value:'-name', text:'Sort by Product Name (reversed)'},
    {value:'-description', text:'Sort by Product Description (reversed)'},
    {value:'-upc', text:'Sort by Product UPC (reversed)'},
    {value:'-product_id', text:'Sort by Product ID (reversed)'},
    {value:'-quantity', text:'Sort by Quantity (reversed)'},
    {value:'-price', text:'Sort by Price (reversed)'},
    {value:'-manufacturer', text:'Sort by Manufacturer (reversed)'}
  ];
  $scope.sortOrder = $scope.sortOptions[0].value;

});
