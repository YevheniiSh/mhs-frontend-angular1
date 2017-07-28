angular
    .module('mhs.admin', ['ngRoute', 'ui.router'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/test', {
            templateUrl: 'admin/game-build/test/test.html',
            controller: 'TestController',
            controllerAs: 'test',
            name:'BuildGame'
        });
        $routeProvider.when('/add-teams', {
            templateUrl: 'admin/add-teams/add-teams.html',
            controller: 'AddTeamsController',
            controllerAs: 'addTeams',
            css:'admin/add-teams/add-teams.css'
        });
    }]);