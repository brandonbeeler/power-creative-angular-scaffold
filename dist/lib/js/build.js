(function() { 'use strict';

  angular.module('app', [
      'ngRoute',
      'ngAnimate',
      'ngCookies',
      'app.appController',
      'app.sampleController'
  ]);

})();



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
(function() { 'use strict';

  angular.module('app.appController', [])
         .controller('app', app);

  function app($scope) {

  }
})();



/**
 * Sample Controller
 * @memberOf Controllers
 */
(function() { 'use strict';

  angular.module('app.sampleController', [])
    .controller('sample', sample);

  /**
   * @namespace Sample≤
   * @desc example controller
   * @memberOf Controllers
   */
  function sample($scope) {
    $scope.person = {};
    $scope.person.firstName = 'Jane';
    $scope.person.lastName = 'Doe';
    $scope.person.sayHello = sayHello;
    // it's important we bind to 'sayHello' namespace & not to the value of the invocation of 'sayHello()'
    
    /**
     * @name sayHello
     * @desc Say "Hello User's Full Name"
     * @returns {String}
     * @memberOf Controllers.Sample
     */
    function sayHello()  {
      return 'Hello ' + getFullName();
    }

    /**
     * @name getFullName
     * @desc Get's the full name from the scope's first & last name
     * @returns {String}
     * @memberOf Controllers.Sample
     */
    function getFullName() {
      return $scope.person.firstName + " " + $scope.person.lastName;
    } 
  }
})();