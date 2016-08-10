var myApp = angular
    .module("myModule", ["ngRoute"])
    .config(function($routeProvider) {
        //$routeProvider.caseInsensitiveMatch = true;

        $routeProvider
            .when("/home", {
                templateUrl: "templates/home.html",
                controller: "homeCtrl",
                controllerAs: "ctrl",
                caseInsensitiveMatch: true
            })
            .when("/courses", {
                templateUrl: "templates/courses.html",
                controller: "coursesCtrl",
                controllerAs: "ctrl"
            })
            .when("/students", {
                templateUrl: "templates/students.html",
                controller: "studentsCtrl",
                controllerAs: "ctrl"
            })
            .when("/students/:id", {
                templateUrl: "templates/studentDetails.html",
                controller: "studentDetailsCtrl",
                controllerAs: "ctrl"
            })
            .otherwise({
                redirectTo: "/home"
            })
    })
    .controller("homeCtrl", function() {
        var vm = this;
        vm.pageTitle = "Home";
    })
    .controller("coursesCtrl", function($http) {
        var vm = this;
        // $http.get("CourseService/GetAllCourses")
        //      .then(function(response) {
        //            vm.courses = response.data;
        //       }, function(reason) {
        //            vm.error = reason.data;
        //       });
        vm.courses = [{ id: 1, name: "Ruby" }, { id: 2, name: "JavaScript" }, { id: 3, name: "Python" }];
    })
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

        var vm = this;

        vm.reloadData = function() {
            $route.reload();
        }

        // $http.get("StudentsService/GetAllStudents")
        //      .then(function(response) {
        //            vm.students = response.data;
        //       }, function(reason) {
        //            vm.error = reason.data;
        //       });
        vm.students = [{ id: 1, name: "Ben", gender: "Male", city: "London" }, { id: 2, name: "Matt", gender: "Male", city: "New York" }, { id: 3, name: "Pam", gender: "Female", city: "Chennai" }];
    }).controller("studentDetailsCtrl", function($http, $routeParams) {
        var vm = this;
        // $http({
        //   url: "StudentsService/GetStudent",
        //   params: {id:$routeParams.id},
        //   method: "get"
        // })
        // .then(function(response) {
        //   vm.student = response.data;
        // }, function(reason) {
        //   vm.error = reason.data;
        // });
        var students = [{ id: 1, name: "Ben", gender: "Male", city: "London" }, { id: 2, name: "Matt", gender: "Male", city: "New York" }, { id: 3, name: "Pam", gender: "Female", city: "Chennai" }];
        vm.student = students[$routeParams.id-1];
    });
