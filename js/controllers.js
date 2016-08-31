// create the controller and inject Angular's $scope
catcher.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

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
    $scope.message = 'Look! I am an about page.';
});

// catcher.controller('adminController', ['$scope', 'dataFactory', 'flash',
//         function ($scope, dataFactory, flash) {

//     $scope.message = 'Look! I am an admin page.';
//     // flash.create('success', "dxxxxxxxx");
//     // flash('danger','Turnaj byl vytvořenss.');
// }]);

catcher.controller('adminController', ['$scope', 'dataFactory', 'Flash',
        function ($scope, dataFactory, Flash) {

    $scope.message = 'Look! I am an admin page.';

    $scope.success = function () {
        var message = '<strong>Well done!</strong> You successfully read this important alert message.';
        Flash.create('success', message);
        $scope.message = message;
    };

    getClubs();

    function getClubs() {
        dataFactory.getClubs()
            .then(function (response) {
                // $scope.message = response.data;
                Flash.create('success', 'Able to load data: ' + angular.toJson(response.data));
            }, function (error) {
                Flash.create('error', 'Unable to load data: ' + error.message)
            });
    }
}]);
