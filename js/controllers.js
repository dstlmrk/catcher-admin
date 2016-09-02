// create the controller and inject Angular's $scope
catcher.controller('mainController', ['$scope', 'Flash',
    function($scope, Flash) {
        // create a message to display in our view
        $scope.test = 'OK';

        var logged = false

        // $scope.loginForm = {}

        // TODO: zatim budu do hlavicek vkladat rucne api_key a az pozdeji udelam role a pristupy
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
        // https://github.com/veselj43/
        // cvut-fit-bibap-bachelors-thesis/blob/master/src/js/controllers.js#L49
}]);

// rest api resources
catcher.factory('Clubs', function ($resource) {
        return $resource('http://catcher.zlutazimnice.cz/api/clubs');
    });

catcher.factory('Tournaments', function ($resource) {
        return $resource('http://catcher.zlutazimnice.cz/api/tournaments');
    });

// controllers
catcher.controller('historyController', ['$scope', '$resource', 'Flash', 'Tournaments',
        function ($scope, $resource, Flash, Tournaments) {
            Tournaments.get(function(data){ 
               $scope.tournaments = data;
            });
}]);

catcher.controller('tournamentsController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('statisticsController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('settingsController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('aboutController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('adminController', ['$scope', '$resource', 'Flash', 'Clubs',
        function ($scope, $resource, Flash, Clubs) {

            Clubs.get(function(data){ 
               $scope.clubs = data
            });

            $scope.message = 'Look! I am an admin page.';

            $scope.success = function () {
                var message = '<strong>Well done!</strong> You successfully read this important alert message.';
                Flash.create('success', message);
                $scope.message = message;
            };
}]);