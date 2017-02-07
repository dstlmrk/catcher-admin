// Tournament controller
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

// Controller for modals in admin page
catcher.controller('tournamentModalsCtrl', function($uibModal, $log, $document) {
    var $ctrl = this;

    $ctrl.addMatch = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addMatchTournamentModal.html',
            controller: 'addMatchTournamentCtrl',
            controllerAs: '$ctrl',
            size: 'lg',
            resolve: {
                divisions: function() {
                    return "xx";
                }
            }
        });
    };
});

catcher.controller('addMatchTournamentCtrl', ['$uibModalInstance', '$route', 'Flash',
    function($uibModalInstance, $route, Flash) {

        var $ctrl = this;
        $ctrl.title = "Add team";
        
        // default prozatim
        // $ctrl._team = {
        //     "country": "CZE"
        // };
        // $ctrl.divisions = divisions;

        $ctrl.ok = function(match) {

        	console.log(match)
            // TODO: tady by mela byt nejaka ochrana, aby uzivatel nemohl odeslat neuplny formular
            // if (!$ctrl._team.name || !$ctrl._team.division_id || !$ctrl._team.shortcut || !$ctrl._team.city) {
            //     return;
            // }

            // Teams.save({
            //     "name": $ctrl._team.name,
            //     "division_id": $ctrl._team.division_id,
            //     "shortcut": $ctrl._team.shortcut,
            //     "city": $ctrl._team.city,
            //     "country": $ctrl._team.country
            // }, function(data) {
            //     Flash.create('success', 'Team is added successfully');
            //     $route.reload();
            // }, function(error) {
            //     Flash.create(
            //         'danger', 'Požadavek byl zpracován s chybou (' + error.status + '): ' + error.statusText
            //     )
            // });
            // modal zaviram
            // $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.close();
        };

    }
]);