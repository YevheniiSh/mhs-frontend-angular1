'use strict';
angular
    .module('mhs.admin', ['ngRoute',
        'firebase',
        'addTeams',
        'gameType',
        'teamFactory',
        'gameFactory',
        'showResult',
        'roundStatus',
        'showTeamResult',
        'login'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setup-game-type/:gameId', {
            template: '<game-type></game-type>',
            css: 'admin/game-build/game-type/game-type.css'
        });
        $routeProvider.when('/add-teams', {
            template: '<add-teams></add-teams>',
            css: 'admin/add-teams/add-teams.css'
        });

        $routeProvider.when('/result-setup/:gameId/:roundNumber/:quizNumber/:mode', {
            template: '<result-setup></result-setup>',
            css: 'admin/result-setup/result-setup-page.css'
        });
        $routeProvider.when('/edit-result/:gameId', {
            template: '<result-editor></result-editor>',
            css: 'admin/result-editor/result-editor.css'
        });
        $routeProvider.when('/show-result/:gameId/:gameStatus', {
            template: '<show-result></show-result>',
            css: 'admin/show-result/show-result.css'
        });
        $routeProvider.when('/round-status/:gameId', {
            template: '<round-status></round-status>',
        });
        $routeProvider.when('/show-team-result/:gameId/:teamId/:gameStatus', {
            template: '<show-team-result></show-team-result>',
            css: 'admin/show-team-result/show-team-result.css'
        });
        $routeProvider.when('/login', {
            template: '<login></login>'
        });
    }]);