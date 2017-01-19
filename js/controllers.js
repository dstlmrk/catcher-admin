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
    }
]);



// controllers
catcher.controller('historyController', ['$scope', 'Flash', 'Tournaments',
    function($scope, Flash, Tournaments) {
        Tournaments.get(function(data) {
            $scope.tournaments = data;
        });
    }
]);

catcher.controller('tournamentController', ['$scope', '$routeParams', 'Tournament',
    function($scope, $routeParams, Tournament) {
        // The second argument to get() is a callback which is
        // executed when the data arrives from server
        Tournament.get({
            id: $routeParams.id
        }, function(data) {
            $scope.tournament = data;
        });
    }
]);


// $scope.oneUser = UserService.get({user: 1});

catcher.controller('statisticsController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('settingsController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('aboutController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('adminController', ['$scope', 'Flash', 'Team', 'Teams',
    function($scope, Flash, Team, Teams) {

        $scope.modalShown = false;
        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };

        Teams.get(function(data) {
            $scope.teams = data
        });

        $scope.message = 'Look! I am an admin page.';

        $scope.success = function() {
            var message = '<strong>Well done!</strong> You successfully read this important alert message.';
            Flash.create('success', message);
            $scope.message = message;
        };

        // do modal okna s upravou uzivatele procpe parametry
        $('#editTeamModal').on('show.bs.modal', function(e) {
            var divisionId = $(e.relatedTarget).data('division-id');
            $(e.currentTarget).find('input[id="inputDivisionId"]').val(divisionId);
            var name = $(e.relatedTarget).data('name');
            $(e.currentTarget).find('input[id="inputName"]').val(name);
            var shortcut = $(e.relatedTarget).data('shortcut');
            $(e.currentTarget).find('input[id="inputShortcut"]').val(shortcut);
            var city = $(e.relatedTarget).data('city');
            $(e.currentTarget).find('input[id="inputCity"]').val(city);
            var country = $(e.relatedTarget).data('country');
            $(e.currentTarget).find('input[id="inputCountry"]').val(country);
        });

        $scope.submit = function(id) {
            console.log('chci smazat polozku')
            console.log(id)
            // Team.delete({id: id}, function(data){});
        };
        // Team.delete({id: 1}, function(data){

        // });

    }
]);