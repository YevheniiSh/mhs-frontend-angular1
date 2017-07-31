'use strict';
angular
    .module('mhs.admin', ['ngRoute', 'addTeams', 'teamFactory', 'showResult'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setup-game-type/:gameId', {
            templateUrl: 'admin/game-build/game-type/game-type.html',
            controller: 'GameTypeController',
            controllerAs: 'gameType'
        });
        $routeProvider.when('/add-teams', {
            template: '<add-teams></add-teams>',
            css:'admin/add-teams/add-teams.css'});

        $routeProvider.when('/result-setup/:gameId', {
            template: '<result-setup></result-setup>',
            css: 'admin/result-setup/result-setup-page.css'
        });
        $routeProvider.when('/edit-result', {
            template: '<result-editor></result-editor>',
            css:'admin/result-editor/result-editor.css'
        });
        $routeProvider.when('/show-result', {
            template: '<show-result></show-result>',
            css:'admin/show-result/show-result.css'
        });
    }]);