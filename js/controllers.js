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

catcher.controller('settingsCtrl', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('aboutCtrl', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});



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
                // neni potreba ty vypada
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

catcher.controller('loginModalCtrl', ['$uibModalInstance', '$route', 'Flash', 'Login',
    function($uibModalInstance, $route, Flash, Login) {
        var $ctrl = this;
        $ctrl.ok = function(login, password) {
            if (!login || !password) {
                return;
            }
            Login.save({
                "login": login,
                "password": password
            }, function(data) {
                Flash.create('success', 'Přihlášení proběhlo úspěšně');
                $route.reload();
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