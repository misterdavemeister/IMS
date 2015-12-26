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
    .when('/admin/user/:id', { templateUrl: '/partials/admin/user/user',
      controller: 'mvUserDetailCtrl', resolve: routeRoleChecks.admin
    })
    .when('/admin/product/:id', { templateUrl: '/partials/admin/product/product-details',
      controller: 'mvProductDetailCtrl', resolve: routeRoleChecks.admin
    })

    .when('/signup', { templateUrl: '/partials/account/signup',
      controller: 'mvSignupCtrl'
    })
    .when('/courses', { templateUrl: '/partials/courses/course-list',
      controller: 'mvCourseListCtrl'
    })
    .when('/courses/:id', { templateUrl: '/partials/courses/course-details',
      controller: 'mvCourseDetailCtrl'
    })
    .when('/profile', { templateUrl: '/partials/account/profile',
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
    .when('/screens/locations', { templateUrl: '/partials/screens/locations/locations',
      controller: 'mvLocationsScreenCtrl', resolve: routeRoleChecks.user
    })
    .when('/screens/products', { templateUrl: '/partials/screens/products/products-list',
      controller: 'mvProductsScreenCtrl', resolve: routeRoleChecks.user
    })
    .when('/screens/search', { templateUrl: '/partials/screens/search/search',
      controller: 'mvSearchScreenCtrl', resolve: routeRoleChecks.user
    })
});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/');
    }
  })
});
