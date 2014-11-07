#Power Creative Angular Coding Conventions & Scaffolding

##Coding Conventions & Style Guide
A lot of the coding conventions you see here are borrowed from [John Papa's Angular Style Guide](https://github.com/johnpapa/angularjs-styleguide). It's great stuff if you have the time to read. Basically I have used that as a base for this and modified / simplified from there.

##Table of Contents

1. [Single Responsiblity](#Single Responsibility)
1. [IIFE & 'use strict'](#IIFE & 'use strict')
1. [Prefix Angular components with the app name](#Prefix Angular components with the app name)

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
