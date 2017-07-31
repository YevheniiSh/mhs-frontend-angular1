angular
    .module('mhs.admin', ['ngRoute', 'addTeams'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setup-game-type/:gameId', {
            templateUrl: 'admin/game-build/game-type/game-type.html',
            controller: 'GameTypeController',
            controllerAs: 'gameType'
        });
        $routeProvider.when('/add-teams', {
            template: '<add-teams></add-teams>',
            css:'admin/add-teams/add-teams.css'
        });
        $routeProvider.when('/edit-result', {
            templateUrl: 'admin/result-editor/result-editor.html',
            controller: 'resultEditorCtrl',
            controllerAs: 'editResult',
            css:'admin/result-editor/result-editor.css'
        });
    }]);