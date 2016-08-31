// create the module and name it catcher
// also include ngRoute for all our routing needs
var catcher = angular.module('catcher', ['ngRoute', 'ui.bootstrap', 'ngFlash']);

// configure our routes
catcher.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        // route for the home page (pouzito, protoze na GitHub pages
        // nemuzu nastavovat webserver a pri pouhem lomitku se presmerovava pryc)
        .when('/home', {
            templateUrl : 'pages/home.html',
            // controller  : 'mainController'
        })

        .when('/tournaments', {
            templateUrl : 'pages/tournaments.html',
            // controller  : 'tournamentsController'
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
            // controller  : 'aboutController'
        })

        // tournament detail
        .when('/tournament', {
            templateUrl : 'pages/tournament.html',
            controller  : 'tournamentsController'
        })

        // match detail
        .when('/match', {
            templateUrl : 'pages/match.html',
            // controller  : 'aboutController'
        })

        // match detail
        .when('/admin', {
            templateUrl : 'pages/admin.html',
            controller  : 'adminController'
        })

        // match detail
        .when('/new-tournament', {
            templateUrl : 'pages/new.html',
            // controller  : 'aboutController'
        })

        .otherwise({redirectTo: '/'});

}]);

catcher.factory('dataFactory', ['$http', function($http) {

    var urlBase = 'http://catcher.zlutazimnice.cz/api/club/1';
    var dataFactory = {};

    dataFactory.getClubs = function () {
        return $http.get(urlBase);
    };
    return dataFactory;
}]);

// catcher.service('dataService', ['$http', function ($http) {

//     var urlBase = 'http://catcher.zlutazimnice.cz/api/club';

//     this.getClubs = function () {
//         return $http.get(urlBase);
//     };
// }]);


angular.module('catcher').controller('TabsDemoCtrl', function ($scope, $window) {
  $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };

  $scope.model = {
    name: 'Tabs'
  };
});
