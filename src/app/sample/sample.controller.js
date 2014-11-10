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