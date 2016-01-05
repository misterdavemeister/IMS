angular.module('app').controller('mvProductsListCtrl', function($scope, mvCachedProduct, mvIdentity) {
  $scope.products = mvCachedProduct.query();
  $scope.identity = mvIdentity;
  $scope.title = "Products";
  $scope.cssClass = "product-header";

  $scope.buttons = [{ url:"/admin/product-add",
      text:'Add Product',
      auth: 'admin'
    }];
  $scope.searchOptions = [{value:'name', text:'Search by Product Name'},
                          {value:'description', text:'Search by Product Description'},
                          {value:'upc', text:'Search by Product UPC'},
                          {value:'product_id', text:'Search by Product ID'},
                          {value:'quantity', text:'Search by Quantity'},
                          {value:'price', text:'Search by Price'},
                          {value:'manufacturer', text:'Search by Manufacturer'}
  ];
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
  $scope.searchText = "";
  $scope.searchOpt = $scope.searchOptions[0].value;
  $scope.sortOrder = $scope.sortOptions[0].value;

  $scope.search = function(row) {
    return (angular.lowercase(String(row[$scope.searchOpt])).indexOf(angular.lowercase($scope.searchText)) !== -1);
  };

  $scope.selectionChanged = function() {
    console.log("Selection changed!");
  }
});
