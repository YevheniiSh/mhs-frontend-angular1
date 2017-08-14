'use strict';
angular
    .module('mhs.admin', ['ngRoute',
        'firebase',
        'addTeams',
        'gameType',
        'showResult',
        'roundStatus',
        'showTeamResult',
        'login',
        'login-panel',
        'game-list',
        'createGame',
        'configGame',
        'ui.bootstrap',
        'teamList',
        'navbar'])
    .config(['$routeProvider', function ($routeProvider) {

        let isAuth = {
            currentUser: ['userAuthService', function (auth) {
                return auth.currentUser();
            }]
        };

        $routeProvider.when('/result-setup/:gameId/:roundNumber/:quizNumber', {
            template: '<result-setup></result-setup>',
            css: 'admin/result-setup/result-setup-page.css',
            resolve: isAuth
        });
        $routeProvider.when('/show-result/:gameId', {
            template: '<show-result></show-result>',
            css: 'admin/show-result/show-result.css'
        });
        $routeProvider.when('/round-status/:gameId', {
            template: '<round-status></round-status>',
            resolve: isAuth
        });
        $routeProvider.when('/show-team-result/:gameId/:teamId', {
            template: '<show-team-result></show-team-result>',
            css: 'admin/show-team-result/show-team-result.css'
        });
        $routeProvider.when('/login', {
            template: '<login></login>',
            css: 'admin/login/login.css'
        });
        $routeProvider.when('/game-list', {
            template: '<game-list></game-list>',
            css: 'admin/game-list/game-list.css'
        });
        $routeProvider.when('/all-teams', {
            template: '<team-list></team-list>',
            css: 'admin/team-list/team-list.css'
        });
        $routeProvider.when('/create-game', {
            template: '<create-game></create-game>',
        });
        $routeProvider.when('/config-game/:gameId', {
            template: '<config-game></config-game>',
            resolve: isAuth
        });
    }])
    .run(["$rootScope", "$location", 'userAuthService', function ($rootScope, $location, userAuthService) {
        $rootScope.$on("$routeChangeError", function () {
            $location.path("/login");
        });
        userAuthService.currentUser().then((res) => {
            $rootScope.currentUser = res.email;
        })
    }]);
