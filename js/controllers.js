// create the controller and inject Angular's $scope
catcher.controller('mainController', ['$scope', 'Flash',
    function($scope, Flash) {
        // create a message to display in our view
        $scope.test = 'OK';

        var logged = false

        // $scope.loginForm = {}

        $scope.login = function(data) {
            if ($scope.login.email === "test" && $scope.login.password === "test") {
                logged = true
                Flash.create('success', 'Úspěšně přihlášen');
            } else {
                Flash.create('danger', 'Chybné přihlašovací údaje');
            }
        }

        $scope.logout = function(data) {
            logged = false
            Flash.create('success', 'Úspěšně odhlášen');
        }

        $scope.logged = function() {
            return logged
        }

        // TODO: udelat login: 
        // https://github.com/veselj43/cvut-fit-bibap-bachelors-thesis/blob/master/src/js/controllers.js#L49
}]);

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
    $scope.message = 'Contact us! JK. This is just a demo.';
});

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


// catcher.controller('adminController', ['$scope', 'dataFactory', 'flash',
//         function ($scope, dataFactory, flash) {

//     $scope.message = 'Look! I am an admin page.';
//     // flash.create('success', "dxxxxxxxx");
//     // flash('danger','Turnaj byl vytvořenss.');
// }]);

catcher.factory('Clubs', function ($resource) {
        return $resource('http://catcher.zlutazimnice.cz/api/clubs');
    });



catcher.controller('adminController', ['$scope', '$resource', 'dataFactory', 'Flash', 'Clubs',
        function ($scope, $resource, dataFactory, Flash, Clubs) {

            // var User = $resource('http://catcher.zlutazimnice.cz/api/club/:userId', {userId:'@userId'});
            // User.get( {userId:1}, function(user){
            //     $scope.profile = user;
            // })

            Clubs.get(function(data){ 
               $scope.clubs = data.items;
               $scope.count = data.count;
            });

            // dataFactory.getClubs().then(function (response) {
            //     // $scope.message = response.data;
            //     $scope.clubs = response.data.items;
            //     // Flash.create('success', 'Able to load data: ' + angular.toJson(response.data));
            // }, function (error) {
            //     Flash.create('danger', 'Unable to load data: ' + error.message)
            // });

            // $scope.clubs = Clubs.get().$save();
            // // console.log(Clubs.get().count)
            // $scope.items = typeof $scope.clubs

            // var Clubs = $resource('http://catcher.zlutazimnice.cz/api/clubs');
            // angular.fromJson(json);
            // $scope.clubs = typeof Clubs.get();

            // UserProfiles.query(function(profiles){
            //     $scope.profiles = profiles;                
            // });

    $scope.message = 'Look! I am an admin page.';

    $scope.success = function () {
        var message = '<strong>Well done!</strong> You successfully read this important alert message.';
        Flash.create('success', message);
        $scope.message = message;
    };



    // function getClubs() {
    //     dataFactory.getClubs()
    //         .then(function (response) {
    //             // $scope.message = response.data;
    //             Flash.create('success', 'Able to load data: ' + angular.toJson(response.data));
    //         }, function (error) {
    //             Flash.create('danger', 'Unable to load data: ' + error.message)
    //         });
    // }
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