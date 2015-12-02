#Power Creative Angular Coding Conventions & Scaffolding
At some point we should turn this into a Yo Generator. I just didn't have the time to do that at the time of writing. 

##Coding Conventions & Style Guide
A lot of the coding conventions you see here are borrowed from [John Papa's Angular Style Guide](https://github.com/johnpapa/angularjs-styleguide). It's great stuff if you have the time to read. Basically I have used that as a base for this style guide. This is basically is a modified / simplified form here for our development process.


##Table of Contents

1. [Single Responsiblity](#single-responsiblity)
1. [IIFE & 'use strict'](#iife--use-strict)
1. [Prefix Angular components with the app name](#prefix-angular-components-with-the-app-name)
1. [Controllers](#controllers)
1. [Code Formatting](#code-formatting)
1. [Directory & File Structure](#directory--file-structure)


###Single Responsiblity
Each file should only contain one angular component (controller, directive, service, etc.). We want our files to be very easy to search out and identify.


####Do This!
```
angular.module('app.controllers.sample', [])
    .controller('sample', sample); // see only one component

  function sample($scope) {
    $scope.name = 'John Doe';
  }
```

####Don't Do This!
```
angular.module('app.controllers.sample', [])
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
  angular.module('app.controllers.sample', [])
    .controller('sample', sample);
})();
```

###Angular Module Naming Convention
An angular module's namespace should contain 3 parts all separated by dot notation.
1. **App Name** - Should be the same for every component on the same project. Can be found by using the name of the app in the app.module.js located in `src/app`.
1. **Module Type** - Group of angular module types this module belongs to. (ex. controllers, services, directives, etc.)
1. **Module Name** - Name of module. Do not include module type here. For example don't put something like productController, etc.

This naming covention helps us make modules more easily identifiable and will help us group similar components together.

```
angular.module('lnx.controllers.sample', []) // notice we prefix our name space w/ 'lnx' & 'controllers'
  .controller('whatever', whatever);
```

###Controllers
A sample controller code example is shown at the bottom if you're one of those people who doesn't read... -_-

####$scope
The $scope object is angular's viewModel (the bridge between a model & a view). The $scope object is passed in as a dependency to your controller, which modifies $scope to expose model data that needs to be bound (via one- or two-way binding) to the view. $scope binding is what makes Angular awesome.

##### Contextual $scope bindings

For the sake of code clarity and readability, all $scope properties should be bound via a parent object.

**DON'T: create a $scope property of simply "name":**

```
<h1>Hello {{ name }}</h1> <!-- confusing, who's name is this? -->

<script>
// Don't do this
angular.controller('sample', function($scope) {
    $scope.name = 'John';
});
</script>
```

** DO: Create a customer object with a "name" property, and attach the customer object to $scope: **

```
<h1>Hello {{ customer.name }}</h1> <!-- see this is more semantic -->

<script>
// Do this
angular.controller('sample', function($scope) {
    $scope.customer = {
        'name': 'John'
    };
});
</script>
```

####Use Named Function Declarations to hide Implementation Details
Declare named functions and bind (on $scope) to the function reference, rather than binding directly to an anonymous function. This helps keep bound members at the top of the controller, and improves code readability. Because a declared function is "hoisted," we are able to reference the function before its actual appearance in the source code. By keeping $scope bindings above, and function declarations below, we enforce a visual separation between the viewModel and the code containing the logic that drives it, improving clarity and readability.

**DON'T:** bind $scope directly to anonymous functions:
```
angular
    .controller('sample',sample);

function sample($scope) {
    // DON'T DO THIS, this is cluttered & as more functions are written becomes un-maintainable
    $scope.sayHello = function() {
        return 'Hello ';
    }
}
```

**DO:** declare named functions and bind $scope to their references:

```
angular
    .controller('sample',sample);

function sample($scope) {
    $scope.sayHello = sayHello; // Assign to the namespace; don't invoke the function by including parenthesis
    
    // DO THIS; This is clean and will keep all function declaration close to each other
    function sayHello() {
        return 'Hello ';
    }
}
```

####Bindable Members Up Top
For readability, place all $scope assignments at the top of the controller.

**DON'T:** spread out $scope assignments across the controller
```
angular.controller('sample',sample);
function sample($scope) {
    function sayHello() {
        return 'Hello ';
    }
    $scope.sayHello = sayHello;
    function privateFunc() {
        return 'shh!';
    };
    $scope.customer = {
        firstName: 'John'
    }
}
```

**DO:** enforce clear separation of $scope assignments from function declarations
```
angular.controller('sample',sample);
function sample($scope) {
    // bindable properties //
    $scope.sayHello = sayHello;
    $scope.customer = { firstName: 'John' }
    // function declarations
    function sayHello() {
        return 'Hello ';
    }
    function privateFunc() {
        return 'shh!';
    }
}
```
####Fuffilling Promises
Services (aka factories) will hold all logic that fetches data. If that data is fetched from an external source then it will be returned as a promise. (See [here](http://www.html5rocks.com/en/tutorials/es6/promises/) for information about promises) If a route requires data from a factory upon initial load then that promise should be fulfilled in the router. When you return a promise from a router Angular will go ahead and fulfill it for you before you controller is executed. This way that data is available to you immediately. You can recieve that data by simply injecting a property with the same name used for the resolve property in to your controller. See the code example below for reference.

**Example Excerpt from Router**
```
.when('/products/:category/:subcategory', {
    controller: 'productCategory',
    resolve: {
        // take note of the name of the below property
        category: function (Product, $route) {
            return Product.getCategoryDetails($route.current.params.subcategory);
        }
    }
})
```

**Example Excerpt from Controller Fulfilling Promise**
```
angular.module('lnx.controllers.productCategory', [])
    .controller('productCategory', productCategoryCtrl);
function productCategoryCtrl($scope, category, Product, $sce, $routeParams, STATIC) {
    // do whatever you want with category now
```

####Defer Controller Logic to Services
All data should live within services to avoid repetition. Controllers should not manipulate data, only fetch & assign to a bound member.

####No DOM Manipulation
Controllers should be 100% DOM independent. All DOM Manipulation should happen within a directive.

####Sample Controller
```
(function() { 'use strict'; // wrap in IIFE & 'use strict' clause'

  angular.module('lnx.controller.sample', []) // prefix module name w/ app & module type
    .controller('sample', sample);
  function sample($scope, people) {
    // bindable properties
    $scope.people = people.data;
    $scope.customer = {
        firstName: 'John',
        lastName: 'Doe'
    }
    $scope.sayHello = sayHello;
    // Defer Function Declarations
    function sayHello()  {
      return 'Hello ' + getFullName();
    }
    function getFullName() {
      return $scope.customer.firstName + " " + $scope.customer.lastName;
    }
  }
})();
```


##Directory & File Structure
Here is the directory structure of the app:
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
    sampleFeature/
        sample.controller.js
        sample.directive.js
        sample.view.html
    (*Directory per feature)
  lib/
    sass/
tests/
Gruntfile.js
package.json
  
```

###Directory Per Feature
Rather than structuring the app directory to contain a sub directory per component type (directive, services, controller) we make a sub directory per feature (AKA resource). Example we may have a directory for products or faq's for the lennox.com redesign. This will prevent these directories from containing too many files making them hard to traverse. As a whole we should try to keep directories from containing more than 7 files. If you start to notice a directory is getting large consider splitting it into sub directories.

```
featureOne
    featureOne.controller.js
    featureOne.factory.js
    featureOne.view.html
featureTwo
    featureTwo.controller.js
    featureTwo.factory.js
    featureTwo.view.html
```

##Code Formatting
Tab size should be set to 4 spaces.
Insert a space before and after parenthesis in if, for, while, switch & catch statements.
Keep opening curly brace on same line for these statements as well.
Format code to use @ngDoc which is a form of @jsDoc. Below is a great example from the sample.controller.js file in the repo.

```
/**
 * @name extractLocationDataFromGeocodeResponse
 * @ngdoc service
 * @methodOf services.geocoder
 * @description
 * Parse through the geocoder result object returned from the geocode() method and extract the user's postal code.
 *
 * @param {object} response - Object returned from geocode() method
 * @see https://developers.google.com/maps/documentation/javascript/reference#GeocoderResult
 *
 * @returns {object} location data
 */
function extractLocationDataFromGeocodeResponse(response) {
    // function logic goes here
}
```

## This is a living document
It will adapt and grow as our knowledge of Angular grows. When we learn something new or find a better way of building something, discuss it with your fellow developers and we'll update this document. The purpose of this document is to improve maintainability and encourage consistency. Please follow these standards for all Power Creative AngularJS projects.
