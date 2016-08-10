# angularjs1-5-cancel-route-change
AngularJS 1.5 Cancel Route Change

Based on 'Cancel route change' at https://www.youtube.com/watch?v=3lPUvJzUvnw&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl&index=38

#Cancel route change

Alert the user when changing route (i.e. navigating to a different URL), and offer to cancel the route change.

For this we use ```$scope.$on()``` event method, for the event "***$routeChangeStart***".
In this case the 'next.$$route.originalPath' object contains the URL fragment (e.g. /home).

```javascript
[...]
    .controller("studentsCtrl", function($http, $route, $scope) {
        // Handle the $routeChangeStart event
        $scope.$on("$routeChangeStart", function(event, next, current) {
            // Show a JavaScript confirmation dialogue
            if(!confirm("Are you sure you want to navigate away from this page to "
                + next.$$route.originalPath)) {
                // Cancel route change, by cancelling the event
                event.preventDefault();
            }
        });
        [...]
```

See scriptA.js, indexA.html and stylesA.css how to implement this.

Alternatively, we can use ```$scope.$on()``` event method, for the event "***$locationChangeStart***".
In this case the 'next' object contains the complete URL (e.g. http://localhost/home).

```javascript
[...]
    .controller("studentsCtrl", function($http, $route, $scope) {
        // Handle the $locationChangeStart event
        $scope.$on("$locationChangeStart", function(event, next, current) {
            // Show a JavaScript confirmation dialogue
            if(!confirm("Are you sure you want to navigate away from this page to "
                + next)) {
                // Cancel route change, by cancelling the event
                event.preventDefault();
            }
        });
        [...]   
```

See scriptB.js, indexB.html and stylesB.css how to implement this.
