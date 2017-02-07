// create the controller and inject Angular's $scope
catcher.controller('mainController', ['$scope', '$location', 'Flash',
    function($scope, $location, Flash) {
        // create a message to display in our view
        $scope.test = 'OK';

        // console.log(localStorage.getItem("api_key"))

        // TODO: na main page po prihlaseni dat jmeno uzivatele
        // $scope.user = localStorage.getItem("");

        // TODO: zatim budu do hlavicek vkladat rucne api_key a az pozdeji udelam role a pristupy
        $scope.login = function() {

            // $scope.user = localStorage.getItem("login");


            // if ($scope.login.email === "test" && $scope.login.password === "test") {
            //     logged = true
            //     Flash.create('success', 'Úspěšně přihlášen');
            // } else {
            //     Flash.create('danger', 'Chybné přihlašovací údaje');
            // }
        }

        $scope.logout = function(data) {
            localStorage.clear();
            $location.path('/');
            Flash.create('success', 'Úspěšně odhlášen');
        }

        $scope.logged = function() {
            return Boolean(localStorage.getItem("api_key"))
        }

        $scope.getLogin = function() {
            return localStorage.getItem("login")
        }

        $scope.getRole = function() {
            return localStorage.getItem("role")
        }

        // fake, vraci kolekci cisel
        $scope.getNumberArray = function(num) {
            return new Array(num);   
        }


        // TODO: udelat login:
        // https://github.com/veselj43/
        // cvut-fit-bibap-bachelors-thesis/blob/master/src/js/controllers.js#L49
    }
]);

// controllers
catcher.controller('historyCtrl', ['$scope', 'Flash', 'Tournaments',
    function($scope, Flash, Tournaments) {
        Tournaments.get(function(data) {
            $scope.tournaments = data;
        });
    }
]);

catcher.controller('statisticsCtrl', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('settingsCtrl', function($scope) {});

catcher.controller('aboutCtrl', function($scope) {});

catcher.controller('addMatchesCtrl', ['$scope', 'Flash',
    function($scope, Flash) {
        $scope.aha = "xxx"
    }
]);

catcher.controller('addGroupCtrl', ['$scope', 'Flash',
    function($scope, Flash) {

        $scope.teams = {}
        $scope.placements = {}

        // // fake, vraci kolekci cisel
        // $scope.getNumberArray = function(num) {
        //     return new Array(num);   
        // }

        $scope.submit = function(group, teams, placements) {
            console.log('submit', group, teams, placements)
            // $scope.master = angular.copy(user);
        };

    }
]);

catcher.controller('addTournamentCtrl', ['$scope', 'Flash',
    function($scope, Flash) {

        // debug
        $scope.divisions = [
            {id: 1, type: 'open'},
            {id: 2, type: 'women'}
        ]

        // $scope.tournament = {
        //     name: 'Prague Winter',
        //     start_date: '2016'
        // }

        // it is necessary for radio input
        $scope.tournament = {
            country: 'CZE'
        }
        $scope.fields = []

        
        $scope.submit = function(tournament, fields) {
            console.log('submit', tournament, fields)
        };

    }
]);

catcher.controller('tournamentSettingsCtrl', ['$scope', 'Flash', 'Teams',
    function($scope, Flash, Teams) {

        // debug
        $scope.divisions = [
            {id: 1, type: 'open'},
            {id: 2, type: 'women'}
        ]

        // it is necessary for radio input
        $scope.tournament = {
            country: 'CZE'
        }

        Teams.get(function(data) {
            $scope.teams = data.teams
        });

        // Teams.get(function(data) {
        //     $scope.teams = data.teams
        // });
    }
]);

catcher.controller('tournamentGroupsCtrl', ['$scope', 'Flash',
    function($scope, Flash) {

        $scope.teams = {}
        $scope.placements = {}

        // // fake, vraci kolekci cisel
        // $scope.getNumberArray = function(num) {
        //     return new Array(num);   
        // }

        $scope.submit = function(group, teams, placements) {
            console.log('submit', group, teams, placements)
            // $scope.master = angular.copy(user);
        };

    }
]);


catcher.controller('tournamentMatchesCtrl', ['$scope', 'Flash',
    function($scope, Flash) {

        console.log('xxx')
        $scope.teams = {}
        $scope.placements = {}

        // // fake, vraci kolekci cisel
        // $scope.getNumberArray = function(num) {
        //     return new Array(num);   
        // }

        $scope.submit = function(group, teams, placements) {
            console.log('submit', group, teams, placements)
            // $scope.master = angular.copy(user);
        };

    }
]);


// NAVIGATION ##############################################################################

catcher.controller('navigationCtrl', function($uibModal, $log, $document) {
    var $ctrl = this;
        $ctrl.register = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'registerModal.html',
            controller: 'registerModalCtrl',
            controllerAs: '$ctrl'
        });
    };

    $ctrl.login = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'loginModal.html',
            controller: 'loginModalCtrl',
            controllerAs: '$ctrl'
        });
    };
});

catcher.controller('registerModalCtrl', ['$uibModalInstance', '$route', 'Flash', 'Registration',
    function($uibModalInstance, $route, Flash, Registration) {
        var $ctrl = this;
        $ctrl.ok = function(login, email) {
            if (!login || !email) {
                return;
            }
            Registration.save({
                "login": login,
                "email": email
            }, function(data) {
                Flash.create('success', 'Na uvedený email byla odeslána zpráva.', 0);
                // neni potreba to vypada
                // $route.reload();
            }, function(error) {
                Flash.create(
                    'danger', 'Požadavek byl zpracován s chybou (' + error.status + '): ' + error.statusText
                )
            });
            // modal zaviram
            $uibModalInstance.close();
        };

        $ctrl.cancel = function() {
            $uibModalInstance.close();
        };
    }
]);

catcher.controller('loginModalCtrl', ['$uibModalInstance', '$scope', '$route', 'Flash', 'Login',
    function($uibModalInstance, $scope, $route, Flash, Login) {
        var $ctrl = this;
        $ctrl.ok = function(login, password) {
            console.log('LOGIN', login, password)
            if (!login || !password) {
                return;
            }

            Login.save({
                "login": login,
                "password": password
            }, function(data) {
                console.log(data)
                localStorage.setItem("api_key", data.api_key);
                localStorage.setItem("role", data.user.role.type);
                localStorage.setItem("login", data.user.login);
                $scope.user = data.user.login;
                // document.getElementById(elementId: DOMString)
                Flash.create('success', 'Přihlášení proběhlo úspěšně');
                $route.reload();
            }, function(error) {
                if (error.status != 401) {
                    console.log(error)
                    Flash.create(
                        'danger', 'Požadavek byl zpracován s chybou (' + error.status + '): ' + error.statusText
                    )
                }   
            });
            // modal zaviram
            $uibModalInstance.close();
        };

        $ctrl.cancel = function() {
            $uibModalInstance.close();
        };
    }
]);




// TOURNAMENT ##############################################################################

catcher.controller('tournamentCtrl', ['$scope', '$routeParams', 'Tournament',
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