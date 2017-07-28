angular
    .module('mhs.admin', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/test', {
            templateUrl: 'admin/game-build/test/test.html',
            controller: 'TestController',
            controllerAs: 'test'
        });
    }]);