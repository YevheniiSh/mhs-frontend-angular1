angular
    .module('mhs.admin', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setup-game-type', {
            templateUrl: 'admin/game-build/game-type/game-type.html',
            controller: 'GameTypeController',
            controllerAs: 'gameType'
        });
    }]);