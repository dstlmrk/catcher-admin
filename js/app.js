// create the module and name it catcher
// also include ngRoute for all our routing needs
var catcher = angular.module('catcher', [
    'ngAnimate', 'ngSanitize', 'ngRoute', 'ui.bootstrap', 'ngFlash', 'ngResource'
]);

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
        .when('/tournament/:id', {
            templateUrl : 'pages/tournament.html',
            controller  : 'tournamentController'
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
            templateUrl : 'pages/new-tournament.html',
            // controller  : 'aboutController'
        })
        .otherwise({redirectTo: '/'});
}]);

// https://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
// rest api resources
catcher.factory('Teams', function($resource) {
    return $resource('http://localhost:9999/api/teams');
});

catcher.factory('Team', function($resource) {
    return $resource('http://localhost:9999/api/team/:id');
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

catcher.controller('ModalDemoCtrl', function ($uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3', 'item4'];

  $ctrl.animationsEnabled = true;

  $ctrl.delete = function (team) {
    console.log(team)
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent2.html',
      controller: 'DeleteTeamCtrl',
      controllerAs: '$ctrl',
      resolve: {
        team: function () {
          return team;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $ctrl.open = function (data, size, parentSelector) {
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
        data: function () {
          return data;
        },
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  // $ctrl.openComponentModal = function () {
  //   var modalInstance = $uibModal.open({
  //     animation: $ctrl.animationsEnabled,
  //     component: 'modalComponent',
  //     resolve: {
  //       items: function () {
  //         return $ctrl.items;
  //       }
  //     }
  //   });

  //   modalInstance.result.then(function (selectedItem) {
  //     $ctrl.selected = selectedItem;
  //   }, function () {
  //     $log.info('modal-component dismissed at: ' + new Date());
  //   });
  // };

  // $ctrl.openMultipleModals = function () {
  //   $uibModal.open({
  //     animation: $ctrl.animationsEnabled,
  //     ariaLabelledBy: 'modal-title-bottom',
  //     ariaDescribedBy: 'modal-body-bottom',
  //     templateUrl: 'stackedModal.html',
  //     size: 'sm',
  //     controller: function($scope) {
  //       $scope.name = 'bottom';  
  //     }
  //   });

  //   $uibModal.open({
  //     animation: $ctrl.animationsEnabled,
  //     ariaLabelledBy: 'modal-title-top',
  //     ariaDescribedBy: 'modal-body-top',
  //     templateUrl: 'stackedModal.html',
  //     size: 'sm',
  //     controller: function($scope) {
  //       $scope.name = 'top';  
  //     }
  //   });
  // };

  // $ctrl.toggleAnimation = function () {
  //   $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  // };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
// https://angular-ui.github.io/bootstrap/ DOKUMENTACE
catcher.controller('DeleteTeamCtrl', ['$uibModalInstance', '$route', 'Flash', 'team', 'Team',
    function ($uibModalInstance, $route, Flash, team, Team) {
  var $ctrl = this;
  $ctrl.team = team;

  $ctrl.ok = function () {
    console.log('DELETE team', $ctrl.team.id)
    // mazu tym s id z modal formulare
    var response = Team.delete({id: $ctrl.team.id}, function(data){
        Flash.create('success', 'Tým byl úspěšně smazán');
        $route.reload();
    }, function(error) {
          Flash.create('danger', 'Požadavek byl zpracován s chybou');
    });
    // modal zaviram
    $uibModalInstance.close();
  };

  $ctrl.cancel = function () {
    $uibModalInstance.close();

  };
}]);

catcher.controller('ModalInstanceCtrl', function ($uibModalInstance, data, items) {
  var $ctrl = this;
  $ctrl.data = data;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
