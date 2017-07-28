angular
    .module('mhs.admin', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        // $routeProvider.when('/build-game', {
        //     templateUrl: 'admin/game-build/game-type/game-type.html',
        //     controller: 'GameTypeController',
        //     controllerAs: 'gameType'
        // });
        $routeProvider.when('/test', {
            templateUrl: 'admin/game-build/test/test.html',
            controller: 'TestController',
            controllerAs: 'test'
        });
        $routeProvider.when('/add-teams', {
            templateUrl: 'admin/add-teams/add-teams.html',
            controller: 'AddTeamsController',
            controllerAs: 'addTeams'
        });
    }]);