// Admin controller
catcher.controller('adminCtrl', ['$scope', 'Flash', 'Teams', 'Users', 'Divisions', 'Roles',
    function($scope, Flash, Teams, Users, Divisions, Roles) {

        Teams.get(function(data) {
            $scope.teams = data.teams
        });

        Users.get(function(data) {
            $scope.users = data.users
        });

        Divisions.get(function(data) {
            $scope.divisions = data.divisions
        });

        Roles.get(function(data) {
            $scope.roles = data.roles 
        });
    }
]);
// Controller for modals in admin page
catcher.controller('adminModalsCtrl', function($uibModal, $log, $document) {
    var $ctrl = this;

    $ctrl.addTeam = function(divisions) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'updateTeamAdminModal.html',
            controller: 'addTeamAdminCtrl',
            controllerAs: '$ctrl',
            resolve: {
                divisions: function() {
                    return divisions;
                }
            }
        });
    };

    $ctrl.addUser = function(roles) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'updateUserAdminModal.html',
            controller: 'addUserAdminCtrl',
            controllerAs: '$ctrl',
            resolve: {
                roles: function() {
                    return roles;
                }
            }
        });
    };

    $ctrl.updateTeam = function(team, divisions) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'updateTeamAdminModal.html',
            controller: 'updateTeamAdminCtrl',
            controllerAs: '$ctrl',
            resolve: {
                team: function() {
                    return team;
                },
                divisions: function() {
                    return divisions;
                }
            }
        });
    };

    $ctrl.updateUser = function(user, roles) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'updateUserAdminModal.html',
            controller: 'updateUserAdminCtrl',
            controllerAs: '$ctrl',
            resolve: {
                user: function() {
                    return user;
                },
                roles: function() {
                    return roles;
                }
            }
        });
    };

    $ctrl.deleteTeam = function(team) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'deleteItemAdminModal.html',
            controller: 'deleteTeamAdminCtrl',
            controllerAs: '$ctrl',
            resolve: {
                item: function() {
                    return team;
                }
            }
        });
    };

    $ctrl.deleteUser = function(user) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'deleteItemAdminModal.html',
            controller: 'deleteUserAdminCtrl',
            controllerAs: '$ctrl',
            resolve: {
                item: function() {
                    return user;
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

// Jednotlive modals ========================================================================================
// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
catcher.controller('addTeamAdminCtrl', ['$uibModalInstance', '$route', 'Flash', 'divisions', 'Teams',
    function($uibModalInstance, $route, Flash, divisions, Teams) {

        var $ctrl = this;
        $ctrl.title = "Add team";
        // default prozatim
        $ctrl._team = {
            "country": "CZE"
        };
        $ctrl.divisions = divisions;

        $ctrl.ok = function() {
            // TODO: tady by mela byt nejaka ochrana, aby uzivatel nemohl odeslat neuplny formular
            if (!$ctrl._team.name || !$ctrl._team.division_id || !$ctrl._team.shortcut || !$ctrl._team.city) {
                return;
            }

            Teams.save({
                "name": $ctrl._team.name,
                "division_id": $ctrl._team.division_id,
                "shortcut": $ctrl._team.shortcut,
                "city": $ctrl._team.city,
                "country": $ctrl._team.country
            }, function(data) {
                Flash.create('success', 'Team is added successfully');
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

catcher.controller('addUserAdminCtrl', ['$uibModalInstance', '$route', 'Flash', 'roles', 'Users',
    function($uibModalInstance, $route, Flash, roles, Users) {

        var $ctrl = this;
        $ctrl.title = "Add user";
        $ctrl.roles = roles;

        $ctrl.ok = function() {
            console.log($ctrl._user)
            // TODO: tady by mela byt nejaka ochrana, aby uzivatel nemohl odeslat neuplny formular
            if (!$ctrl._user.login || !$ctrl._user.password || !$ctrl._user.email || !$ctrl._user.role_id) {
                return;
            }
            Users.save({"login": $ctrl._user.login, "password": $ctrl._user.password, "email": $ctrl._user.email, "role_id": $ctrl._user.role_id}, function(data) {
                Flash.create('success', 'User is added successfully');
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

catcher.controller('updateTeamAdminCtrl', ['$uibModalInstance', '$route', 'Flash', 'team', 'divisions', 'Team',
    function($uibModalInstance, $route, Flash, team, divisions, Team) {

        var $ctrl = this;
        $ctrl.title = "Edit team"
        $ctrl.team = team;
        $ctrl.divisions = divisions;
        // deep copy
        $ctrl._team = JSON.parse(JSON.stringify(team))

        $ctrl.ok = function() {
            // pouzitim angular.toJson se vyhnu internal-use values v jsonu
            Team.update({
                id: $ctrl.team.id
            }, {
                "name": $ctrl._team.name,
                "division_id": $ctrl._team.division_id,
                "shortcut": $ctrl._team.shortcut,
                "city": $ctrl._team.city,
                "country": $ctrl._team.country
            }, function(data) {
                Flash.create('success', 'Team is edited successfully');
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

catcher.controller('updateUserAdminCtrl', ['$uibModalInstance', '$route', 'Flash', 'user', 'roles', 'User',
    function($uibModalInstance, $route, Flash, user, roles, User) {

        var $ctrl = this;
        $ctrl.title = "Edit user"
        $ctrl.user = user;
        $ctrl.roles = roles;
        // deep copy
        $ctrl._user = JSON.parse(JSON.stringify(user))

        $ctrl.ok = function() {
            // pouzitim angular.toJson se vyhnu internal-use values v jsonu
            User.update({
                id: $ctrl.user.id
            }, {"login": $ctrl._user.login, "email": $ctrl._user.email, "role_id": $ctrl._user.role_id}, function(data) {
                Flash.create('success', 'User is edited successfully');
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

catcher.controller('deleteTeamAdminCtrl', ['$uibModalInstance', '$route', 'Flash', 'item', 'Team',
    function($uibModalInstance, $route, Flash, item, Team) {
        var $ctrl = this;
        $ctrl.item = item;
        $ctrl.ok = function() {
            // mazu polozku s id z modal okna
            Team.delete({
                id: $ctrl.item.id
            }, function(data) {
                console.log(data)
                Flash.create('success', 'Team is deleted successfully');
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

catcher.controller('deleteUserAdminCtrl', ['$uibModalInstance', '$route', 'Flash', 'item', 'User',
    function($uibModalInstance, $route, Flash, item, User) {
        var $ctrl = this;
        $ctrl.item = item;
        $ctrl.ok = function() {
            // mazu polozku s id z modal okna
            User.delete({
                id: $ctrl.item.id
            }, function(data) {
                console.log(data)
                Flash.create('success', 'User is deleted successfully');
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