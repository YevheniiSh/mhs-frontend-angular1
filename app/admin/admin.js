'use strict';
angular
    .module('mhs.admin', ['ngRoute', 'addTeams', 'teamFactory'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setup-game-type/:gameId', {
            templateUrl: 'admin/game-build/game-type/game-type.html',
            controller: 'GameTypeController',
            controllerAs: 'gameType'
        });
        $routeProvider.when('/add-teams', {
            template: '<add-teams></add-teams>',
            css:'admin/add-teams/add-teams.css'});

        $routeProvider.when('/result-setup', {
            templateUrl: 'admin/result-setup/result-setup-page.html',
            controller: 'ResultSetupController',
            controllerAs: 'resultSetup',
            css: 'admin/result-setup/result-setup-page.css'
        });
        $routeProvider.when('/edit-result', {
            templateUrl: 'admin/result-editor/result-editor.html',
            controller: 'resultEditorCtrl',
            controllerAs: 'editResult',
            css:'admin/result-editor/result-editor.css'
        });
    }]);