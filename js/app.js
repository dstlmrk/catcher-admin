// create the module and name it catcher
// also include ngRoute for all our routing needs
    var catcher = angular.module('catcher', ['ngRoute']);

    // configure our routes
    catcher.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            .when('/tournaments', {
                templateUrl : 'pages/tournaments.html',
                controller  : 'tournamentsController'
            })

            .when('/statistics', {
                templateUrl : 'pages/statistics.html',
                // controller  : 'contactController'
            })

            .when('/history', {
                templateUrl : 'pages/history.html',
                // controller  : 'contactController'
            })

            .when('/settings', {
                templateUrl : 'pages/settings.html',
                // controller  : 'contactController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // .when('/tournaments', {
            //     templateUrl : 'pages/tournaments.html',
            //     controller  : 'contactController'
            // })
    });

    // create the controller and inject Angular's $scope
    catcher.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    catcher.controller('tournamentsController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

    catcher.controller('statisticsController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

    catcher.controller('historyController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

    catcher.controller('settingsController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

    catcher.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });