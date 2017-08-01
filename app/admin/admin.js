'use strict';
angular
    .module('mhs.admin', ['ngRoute', 'addTeams','gameType', 'teamFactory', 'gameFactory', 'showResult','showTeamResult'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setup-game-type/:gameId', {
            // templateUrl: 'admin/game-build/game-type/game-type.html',
            // controller: 'GameTypeController',
            // controllerAs: 'gameType',
            template: '<game-type></game-type>'
        });
        $routeProvider.when('/add-teams', {
            template: '<add-teams></add-teams>',
            css:'admin/add-teams/add-teams.css'});

        $routeProvider.when('/result-setup/:gameId', {
            template: '<result-setup></result-setup>',
            css: 'admin/result-setup/result-setup-page.css'
        });
        $routeProvider.when('/edit-result/', {
            template: '<result-editor></result-editor>',
            css:'admin/result-editor/result-editor.css'
        });
        $routeProvider.when('/show-result/:gameId', {
            template: '<show-result></show-result>',
            css:'admin/show-result/show-result.css'
        });
        $routeProvider.when('/round-status/:gameId', {
            template: '<round-status></round-status>',
        });
        $routeProvider.when('/show-team-result/:gameId/:teamId', {
            template: '<show-team-result></show-team-result>',
            css:'admin/show-team-result/show-team-result.css'
        });
    }]);