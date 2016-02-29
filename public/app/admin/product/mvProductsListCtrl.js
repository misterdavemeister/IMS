angular.module('app').controller('mvProductsListCtrl', function($scope, $location, mvNotifier, mvProductAdmin, mvCachedProduct, mvIdentity) {
  $scope.products = mvCachedProduct.query();
  $scope.identity = mvIdentity;
  $scope.title = "Products";
  $scope.cssClass = "product-header";
  $scope.adding = false;
  $scope.active = 1;
  $scope.lowQuantity = false;

  $scope.buttons = [{
    url      : "/screens/products",
    text     : "Products",
    auth     : 'user',
    id       : 1,
    click    : function (id) {
      $scope.adding = false;
      $scope.active = id;
    },
    isCurrent: function (id) {
      return $scope.active === id;
    }
  }, {
    url      : "/screens/products",
    text     :'Create Product',
    auth     : 'admin',
    id       : 2,
    click    : function (id) {
      $scope.adding = true;
      $scope.active = id;
    },
    isCurrent: function (id) {
      return $scope.active === id;
    }
  }];

  $scope.searchOptions = [{value:'', text:'Search by Any'},
                          {value:'name', text:'Search by Product Name'},
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

  $scope.isAdding = function() {
    return $scope.adding;
  };

  $scope.cancel = function() {
    $scope.active = 1;
    $scope.adding = false;
  };

  $scope.addProduct = function() {
    var newProductData = {
      name        : $scope.name,
      description : $scope.description,
      upc         : $scope.upc,
      product_id  : $scope.product_id,
      quantity    : $scope.quantity,
      price       : $scope.price,
      manufacturer: $scope.manufacturer,
      alarm       : $scope.alarm,
      alarm_at    : $scope.alarm_at
    };
    mvProductAdmin.createProduct(newProductData).then(function(product) {
      $scope.products = mvCachedProduct.reload();
      $scope.currentItem = product;
      $scope.active = 1;
      $scope.adding = false;
      mvNotifier.success("Product successfully added!");
      $location.path('/admin/product/' + $scope.currentItem._id);
    }, function(reason) {
      mvNotifier.error(reason);
    });
  };

    $scope.toggleLowQuantity = function() {
        $scope.lowQuantity = !$scope.lowQuantity;
        console.log($scope.lowQuantity);
    };

    $scope.approved = function(product) {
        if ($scope.lowQuantity === true) {
            if (product.alarm_enabled && product.quantity <= product.alarm_at) {
                return true;
            } else {
                return false;
            }
        }
        else return true; // SHOW ALL PRODUCTS
    };
});
