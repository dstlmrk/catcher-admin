// create the module and name it catcher
// also include ngRoute for all our routing needs
var catcher = angular.module('catcher', [
    'ngAnimate', 'ngSanitize', 'ngRoute', 'ui.bootstrap', 'ngFlash', 'ngResource'
]);


// catcher.config(['$httpProvider', function($httpProvider){
//   $httpProvider.responseInterceptors.push('error401');
//   $httpProvider.responseInterceptors.push('error4xx');
// }]);

// configure our routes
catcher.config(['$routeProvider', '$locationProvider', '$provide', '$httpProvider',
    function($routeProvider, $locationProvider, $provide, $httpProvider) {
    
    // slouzi k tomu, aby se pri responsich s kodem 401 page presmerovala
    // na homapage a smazata api_key z local storage
    $provide.factory('unauthorisedInterceptor', ['$q', '$location', 'Flash', function ($q, $location, Flash) {
        return {
            'responseError': function (rejection) {
                console.log(rejection);

                if (rejection.status === 401) {
                    if (rejection.data && rejection['data']['title'] == 'Authentication Failed') {
                        Flash.create(
                            'danger',
                            '<b>You aren\'t logged!</b> Login or password is wrong.'
                        );
                    } else {
                        // pokud bych chtel pomoci Flash vyhazovat nejake zpravy o tom, ze uzivatel
                        // byl odhlasen, bylo by nutne volat nize uvedenou funkci (angular ale hlasi
                        // nejakou divnou chybi v konzoli, tak jsem to nechal na puvodnim presmerovani)
                        // $location.path('/');
                        window.location.href = '/';
                        localStorage.clear()
                    }
                }

                return $q.reject(rejection);
            }
        };
    }]);

    $httpProvider.interceptors.push('unauthorisedInterceptor');

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
            // controller  : 'tournamentsCtrl'
        })
        .when('/statistics', {
            templateUrl : 'pages/statistics.html',
            // controller  : 'contactCtrl'
        })
        .when('/history', {
            templateUrl : 'pages/history.html',
            controller  : 'historyCtrl'
        })
        .when('/settings', {
            templateUrl : 'pages/settings.html',
            // controller  : 'contactCtrl'
        })
        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutCtrl'
        })
        // tournament detail
        .when('/tournament/:id', {
            templateUrl : 'pages/tournament.html',
            controller  : 'tournamentCtrl'
        })
        // match detail
        .when('/match', {
            templateUrl : 'pages/match.html',
            // controller  : 'aboutCtrl'
        })
        // match detail
        .when('/admin', {
            templateUrl : 'pages/admin.html',
            controller  : 'adminCtrl'
        })
        // match detail
        .when('/new-tournament', {
            templateUrl : 'pages/new-tournament.html',
            // controller  : 'aboutCtrl'
        })
        .otherwise({redirectTo: '/'});
}]);

// https://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
// 'get':    {method:'GET'},
// 'save':   {method:'POST'},
// 'query':  {method:'GET', isArray:true},
// 'remove': {method:'DELETE'},
// 'delete': {method:'DELETE'} };

// TODO:
// posilani authorization v hlavicce:
// get: {
//         method: 'GET',
//         headers: { 'something': 'anything' }
//     }
// rest api resources
catcher.factory('Divisions', function($resource) {
    return $resource('http://catcher.zlutazimnice.cz/api/divisions');
});

catcher.factory('Roles', function($resource) {
    return $resource('http://catcher.zlutazimnice.cz/api/roles');
});

catcher.factory('Teams', function($resource) {
    return $resource('http://catcher.zlutazimnice.cz/api/teams', {}, {
    'save': {method: 'POST', headers: {'Authorization': localStorage.getItem("api_key")}}
    });
});

catcher.factory('Users', function($resource) {
    return $resource('http://catcher.zlutazimnice.cz/api/users');
});

catcher.factory('Login', function($resource) {
    return $resource('http://catcher.zlutazimnice.cz/api/login');
});

catcher.factory('Registration', function($resource) {
    return $resource('http://catcher.zlutazimnice.cz/api/registration');
});

catcher.factory('User', function($resource) {
    return $resource('http://catcher.zlutazimnice.cz/api/user/:id', { id: '@_id' }, {
        'update': {method: 'PUT', headers: {'Authorization': localStorage.getItem("api_key")}},
        'delete': {method: 'DELETE', headers: {'Authorization': localStorage.getItem("api_key")}}
    });
});

catcher.factory('Team', function($resource) {
    return $resource('http://catcher.zlutazimnice.cz/api/team/:id', { id: '@_id' }, {
        'update': {method: 'PUT', headers: {'Authorization': localStorage.getItem("api_key")}},
        'delete': {method: 'DELETE', headers: {'Authorization': localStorage.getItem("api_key")}}
    });
});

catcher.factory('Tournaments', function($resource) {
    return $resource('http://catcher.zlutazimnice.cz/api/tournaments');
});

catcher.factory('Tournament', ['$resource', function($resource) {
    return $resource('http://catcher.zlutazimnice.cz/api/tournament/:id');
}]);

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
