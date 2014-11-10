/**
 * Sample Controller Test
 * @memberOf Tests
 */
(function() { 'use strict';
    describe("Sample Controller Test", function() {
      beforeEach(module('app'));

      // Here is an example spec
      it("should say hello followed by user's full name", inject(function($rootScope, $controller) {
        var $scope = $rootScope.$new(),
            ctrl = $controller('sample', { $scope: $scope });

        $scope.person.firstName = 'Jimmy';
        $scope.person.lastName = 'Johns';

        // Here is an expectation or requirement for this spec
        expect($scope.person.sayHello()).toEqual('Hello Jimmy Johns');
      }));
    });
  }
})();