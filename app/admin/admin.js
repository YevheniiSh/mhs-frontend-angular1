angular
    .module('mhs.admin', ['ngRoute', 'addTeams'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setup-game-type', {
            templateUrl: 'admin/game-build/game-type/game-type.html',
            controller: 'GameTypeController',
            controllerAs: 'gameType'
        });
        $routeProvider.when('/add-teams', {
            template: '<add-teams></add-teams>',
            css:'admin/add-teams/add-teams.css'
        });
    }]);