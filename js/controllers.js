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

catcher.controller('statisticsController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('settingsController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

catcher.controller('aboutController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});


// ADMIN ##############################################################################

catcher.controller('adminController', ['$scope', 'Flash', 'Team', 'Teams', 'Divisions',
    function($scope, Flash, Team, Teams, Divisions) {

        Teams.get(function(data) {
            $scope.teams = data.teams
        });

        Divisions.get(function(data) {
            $scope.divisions = data.divisions
        });
    }
]);



catcher.controller('TeamAdminCtrl', function($uibModal, $log, $document) {
    var $ctrl = this;

    $ctrl.add = function(divisions) {
        console.log('XXX')
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'updateTeamAdminModal.html',
            controller: 'AddTeamAdminCtrl',
            controllerAs: '$ctrl',
            resolve: {
                divisions: function() {
                    return divisions;
                }
            }
        });
    };

    $ctrl.update = function(team) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'updateTeamAdminModal.html',
            controller: 'UpdateTeamAdminCtrl',
            controllerAs: '$ctrl',
            resolve: {
                team: function() {
                    return team;
                }
            }
        });
    };

    $ctrl.delete = function(team) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'deleteTeamAdminModal.html',
            controller: 'DeleteTeamAdminCtrl',
            controllerAs: '$ctrl',
            resolve: {
                team: function() {
                    return team;
                }
            }
        });
    };

    // nechavam si pro pripad znovupouziti ---------------------
    // https://angular-ui.github.io/bootstrap/
    $ctrl.open = function(data, size, parentSelector) {
        console.log(data, size, parentSelector)
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                data: function() {
                    return data;
                },
                items: function() {
                    return $ctrl.items;
                }
            }
        });
        // timhle mam podchycene situace, kdy uzivatel klikne mimo modal
        modalInstance.result.then(function(selectedItem) {
            $ctrl.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    // ---------------------------------------------------------
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
catcher.controller('AddTeamAdminCtrl', ['$uibModalInstance', '$route', 'Flash', 'divisions', 'Teams', 'Divisions',
    function($uibModalInstance, $route, Flash, divisions, Teams, Divisions) {

        var $ctrl = this;
        $ctrl.title = "Add team";
        $ctrl._team = {
            "country": "CZE"
        };
        $ctrl.divisions = divisions;

        $ctrl.ok = function() {
            // TODO: tady by mela byt nejaka ochrana, aby uzivatel nemohl odeslat neuplny formular
            if (!$ctrl._team) {
                return;
            }
            Teams.save(angular.toJson($ctrl._team), function(data) {
                Flash.create('success', 'Tým byl úspěšně upraven');
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

catcher.controller('UpdateTeamAdminCtrl', ['$uibModalInstance', '$route', 'Flash', 'team', 'Team',
    function($uibModalInstance, $route, Flash, team, Team) {

        var $ctrl = this;
        $ctrl.title = "Editace týmu"
        $ctrl.team = team;
        // deep copy
        $ctrl._team = JSON.parse(JSON.stringify(team))

        $ctrl.ok = function() {
            // pouzitim angular.toJson se vyhnu internal-use values v jsonu
            Team.update({
                id: $ctrl.team.id
            }, angular.toJson($ctrl._team), function(data) {
                Flash.create('success', 'Tým byl úspěšně upraven');
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

catcher.controller('DeleteTeamAdminCtrl', ['$uibModalInstance', '$route', 'Flash', 'team', 'Team',
    function($uibModalInstance, $route, Flash, team, Team) {

        var $ctrl = this;
        $ctrl.team = team;

        $ctrl.ok = function() {
            // mazu tym s id z modal okna
            Team.delete({
                id: $ctrl.team.id
            }, function(data) {
                console.log(data)
                Flash.create('success', 'Tým byl úspěšně smazán');
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