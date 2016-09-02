// create the module and name it catcher
// also include ngRoute for all our routing needs
var catcher = angular.module('catcher', ['ngRoute', 'ui.bootstrap', 'ngFlash', 'ngResource']);

// configure our routes
catcher.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            // controller  : 'mainController'
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
            controller  : 'historyController'
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

        // tournament detail
        .when('/tournament', {
            templateUrl : 'pages/tournament.html',
            // controller  : 'tournamentsController'
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


// var helloApp = angular.module("helloApp", [ 'ngResource' ]);
// helloApp.controller("HttpController", [ '$scope', '$resource',
//         function($scope, $resource) {
//             //
//             // GET Action Method
//             //
//             var User = $resource('/user/:userId', {userId:'@userId'});
//             User.get( {userId:25}, function(user){
//                 $scope.profile = user;
//             })
//             //
//             // Query Action Method
//             //
//             var UserProfiles = $resource('/getAllProfiles');
//             UserProfiles.query(function(profiles){
//                 $scope.profiles = profiles;                 
//             });
//         } ]);


catcher.directive('showErrors', function() {
    return {
      restrict: 'A',
      require: '^form',
      link: function (scope, el, attrs, formCtrl) {
        // find the text box element, which has the 'name' attribute
        var inputEl   = el[0].querySelector("[name]");
        // convert the native text box element to an angular element
        var inputNgEl = angular.element(inputEl);
        // get the name on the text box
        var inputName = inputNgEl.attr('name');
        
        // only apply the has-error class after the user leaves the text box
        inputNgEl.bind('blur', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        })
      }
    }
  });

// catcher.factory('dataFactory', ['$http', function($http) {

//     var urlBase = 'http://catcher.zlutazimnice.cz/api/';
//     var dataFactory = {};

//     dataFactory.getClubs = function () {
//         return $http.get(urlBase + 'clubs');
//     };
//     return dataFactory;
// }]);

// slouzi pro tabulatory na strance s turnajem
angular.module('catcher').controller('TabsDemoCtrl', function ($scope, $window) {
  // $scope.tabs = [
    // { title:'Dynamic Title 1', content:'Dynamic content 1' },
    // { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  // ];

  // $scope.alertMe = function() {
    // setTimeout(function() {
      // $window.alert('You\'ve selected the alert tab!');
    // });
  // };

  $scope.model = {
    name: 'Tabs'
  };
});
