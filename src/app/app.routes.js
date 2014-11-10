(function() { 'use strict';

  angular.module('app')
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/views/default.view.html', // remember you are referencing the view in the distribution directory & not the src directory
        })
        .when('/sample', {
          templateUrl: '/views/sample.view.html',
          controller: 'sample'
        })
        .when('/404', {
          templateUrl: '/views/404.view.html' 
        })

        // otherwise they've enter an invalid url so take them to 404 page
        .otherwise({
          redirectTo: '/404'
        });


      /**
       * Tell Angular to use html5 history api when available.
       * Angular will fallback to hashbang url's for legacy browsers
       */
      $locationProvider.html5Mode(true);
  });
})();