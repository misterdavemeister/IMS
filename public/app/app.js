angular.module('app', ['ngResource', 'ngRoute', 'ngAlertify']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {
      auth: function (mvAuth) {
        return mvAuth.authorizeCurrentUserForRoute('admin');
      }
    },
    user: {
      auth: function(mvAuth) {
        return mvAuth.authorizeAuthenticatedUserForRoute();
      }
    }
  };

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl' })

    // ADMIN //
    .when('/admin/users', { templateUrl: '/partials/admin/user/user-list',
      controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
    })
    .when('/admin/user/:id', { templateUrl: '/partials/admin/user/user-details',
      controller: 'mvUserDetailCtrl', resolve: routeRoleChecks.admin
    })
    .when('/admin/user-add', { templateUrl: '/partials/admin/user/user-add',
      controller: 'mvUserAddCtrl', resolve: routeRoleChecks.admin
    })
    .when('/admin/user/edit/:id', { templateUrl: '/partials/account/profile',
      controller: 'mvProfileCtrl', resolve: routeRoleChecks.admin
    })
    .when('/admin/product/:id', { templateUrl: '/partials/admin/product/product-details',
      controller: 'mvProductDetailCtrl', resolve: routeRoleChecks.user
    })
    .when('/admin/product-add', { templateUrl: '/partials/admin/product/product-add',
      controller: 'mvProductAddCtrl', resolve: routeRoleChecks.admin
    })
    .when('/admin/product/edit/:id', { templateUrl: '/partials/admin/product/product-edit',
      controller: 'mvProductDetailCtrl', resolve: routeRoleChecks.admin
    })
    .when('/admin/inbound/:id', { templateUrl: '/partials/screens/inbound/inbound-details',
      controller: 'mvInboundDetailCtrl', resolve: routeRoleChecks.user
    })


    .when('/courses', { templateUrl: '/partials/courses/course-list',
      controller: 'mvCourseListCtrl'
    })
    .when('/courses/:id', { templateUrl: '/partials/courses/course-details',
      controller: 'mvCourseDetailCtrl'
    })
    .when('/profile/:id', { templateUrl: '/partials/account/profile',
      controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
    })


    // SCREENS //
    .when('/screens/inventory', { templateUrl: '/partials/screens/inventory/inventory',
      controller: 'mvInventoryScreenCtrl', resolve: routeRoleChecks.user
    })
    .when('/screens/outbound', { templateUrl: '/partials/screens/outbound/outbound',
      controller: 'mvOutboundScreenCtrl', resolve: routeRoleChecks.user
    })
    .when('/screens/inbound', { templateUrl: '/partials/screens/inbound/inbound',
      controller: 'mvInboundScreenCtrl', resolve: routeRoleChecks.user
    })
    .when('/screens/inbound/order/', { templateUrl: '/partials/screens/inbound/new-purchase-order',
      controller: 'mvNewPurchaseOrderCtrl', resolve: routeRoleChecks.user
    })
    .when('/screens/inbound/order/:id', { templateUrl: '/partials/screens/inbound/new-purchase-order',
      controller: 'mvNewPurchaseOrderCtrl', resolve: routeRoleChecks.user
    })
    .when('/screens/locations', { templateUrl: '/partials/screens/locations/locations',
      controller: 'mvLocationsScreenCtrl', resolve: routeRoleChecks.user
    })
    .when('/screens/products', { templateUrl: '/partials/screens/products/products-list',
      controller: 'mvProductsListCtrl', resolve: routeRoleChecks.user
    })
    .when('/screens/reports', { templateUrl: '/partials/screens/reports/reports',
      controller: 'mvReportsScreenCtrl', resolve: routeRoleChecks.user
    })
});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/');
    }
  })
});
