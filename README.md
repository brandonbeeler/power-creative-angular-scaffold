#Power Creative Angular Coding Conventions & Scaffolding

##Coding Conventions & Style Guide
A lot of the coding conventions you see here are borrowed from [John Papa's Angular Style Guide](https://github.com/johnpapa/angularjs-styleguide). It's great stuff if you have the time to read. Basically I have used that as a base for this and modified / simplified form here.


##Table of Contents

1. [Single Responsiblity](#single-responsiblity)
1. [IIFE & 'use strict'](#iife--use-strict)
1. [Prefix Angular components with the app name](#prefix-angular-components-with-the-app-name)
1. [Controllers](#controllers)
1. [Code Formatting](#code-formatting)
1. [Directory Structure](#directory-structure)


###Single Responsiblity
Each file should only contain one angular component (controller, directive, service, etc.). We want our files to be very easy to search out and identify.


####Do This!
```
angular.module('app.sampleController', [])
    .controller('sample', sample); // see only one component

  function sample($scope) {
    $scope.name = 'John Doe';
  }
```

####Don't Do This!
```
angular.module('app.sampleController', [])
    .controller('sample', sample)
    .controller('sample2', sample2); // this is bad

  function sample($scope) {
    $scope.name = 'John Doe';
  }
  
  function sample2($scope) {
    $scope.name = 'Jane Doe';
  }
```

###IIFE & 'use strict'
Wrap AngularJS components in an Immediately Invoked Function Expression (IIFE) to avoid leaking global JS variables. Also be sure to add the 'use strict' clause to every component. [If you're interested in learning more about strict mode view this article.](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)

```
(function() { 'use strict';
  angular.module('app.sampleController', [])
    .controller('sample', sample);
})();
```

###Prefix Angular components with the app name
This avoids naming collisions & makes it easier to identify custom written components versus third party components. You can find the name of the app in the app.module.js located in the src/app/ directory.
```
angular.module('lnx.sampleController', []) // notice the prefix lnx which is the name of this app
  .controller('whatever', whatever);
```

###Controllers
A sample controller code example will be shown at the bottom

####$scope
The $scope variable is angular's viewModel (bridge between view & model). This is the data that is binded two ways between the view & controller and what makes Angular awesome. Our practice will be to bind all data on the $scope variable. There are other practices that mask this connection. $scope will be passed in as a dependency to your controller and all data will be binded as a property to that object.

####Bindable Members Up Top
Place all binded data at the top of the controller to make it easier and quicker to identify. This is all the assignements to the $scope object.

####Function Declarations to hide Implementation Details
We will avoid using anonymous functions for binded functions, instead deferring to passing in a named function which will be declared later in the file below the binded functions. This helps us keep our binded members at the top of the controller. Also we will use function declarations rather than expressions. A function declaration's scope is hoisted meaning you can use a function before it is declared in the order of code. Also function declarations will show a very visible syntactical difference from the binded members above.

####Defer Controller Logic to Services
Any data should be placed in Service to avoid repetition. Controller's should not manipulate data only fetch & assign to a binded member.

####No DOM Manipulation
Controllers shouldn't be 100% DOM independent. All DOM Manipulation should happen in a directive.

####Controller Activation Promises
Resolve start-up logic for a controller in an activate function. Placing start-up logic in a consistent place in the controller makes it easier to locate, more consistent to test, and helps avoid spreading out the activation logic across the controller. Will be used particulary when fetching data from a service which will almost always be the case.

####Sample Controller
```
(function() { 'use strict'; // wrap in IIFE & 'use strict' clause'

  angular.module('lnx.sampleController', []) // prefix module name
    .controller('sample', sample);

  function sample($scope, dataService) {
    // Bindable properties
    $scope.firstName = 'John';
    $scope.lastName = 'Doe';
    $scope.people = [];
    $scope.sayHello = sayHello();
    
    // Resolve startup logic
    activate();
    
    // Defer Function Declarations
    function activate() {
        return dataService.get().then(function(data) {
            $scope.people = data;
        }
    }
    
    function sayHello()  {f
      return 'Hello ' + getFullName();
    }

    function getFullName() {
      return $scope.firstName + " " + $scope.lastName;
    }
  }
})();
```
##Code Formatting
Tab size should be set to 2 spaces. Insert a space before and after paren in if, for, while, switch & catch statements. Keep Opening curly brace on same line for these statements as well. Format code to use [@ngDoc](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation) which is a form of [@jsDoc](https://github.com/johnpapa/angularjs-styleguide/blob/master/README.md#jsdoc). Below is a great example from the sample.controller.js file in the repo.
```
/**
 * Sample Controller
 * @memberOf Controllers
 */
(function() { 'use strict';

  angular.module('lnx.sampleController', [])
    .controller('sample', sample);

  /**
   * @namespace Sample
   * @desc example controller
   * @memberOf Controllers
   */
  function sample($scope) {
    $scope.firstName = 'John';
    $scope.lastName = 'Doe';
    $scope.fullName = getFullName();
    $scope.sayHello = sayHello();

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
      return $scope.firstName + " " + $scope.lastName;
    }
  }
})();
```

##Directory Structure
Here is the directory structure of the app
```
dist/
  .htaccess
  index.html
  lib/
    css/
    fonts/
    img/
    js/
      angular.js
      build.js
      build.min.js
src/
  app/
    app.module.js
    app.routes.js
    app.controller.js
    
  lib/
    sass/
tests/
Gruntfile.js
package.json
  
```
