'use strict';
angular
    .module('mhs.admin', ['ngRoute', 'addTeams','gameType', 'teamFactory', 'gameFactory', 'showResult'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setup-game-type/:gameId', {
            template: '<game-type></game-type>',
            css:'admin/game-build/game-type/game-type.css'
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
    }]);