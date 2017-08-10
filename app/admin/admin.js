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
        'applicationForm',
        'ui.bootstrap'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setup-game-type/:gameId', {
            template: '<game-type></game-type>',
            css: 'admin/game-build/game-type/game-type.css',
            resolve: {
                currentUser: ['userAuthService', function (auth) {
                    return auth.currentUser();
                }]
            }
        });
        $routeProvider.when('/add-teams', {
            template: '<add-teams></add-teams>',
            css: 'admin/add-teams/add-teams.css',
            resolve: {
                currentUser: ['userAuthService', function (auth) {
                    return auth.currentUser();
                }]
            }
        });

        $routeProvider.when('/result-setup/:gameId/:roundNumber/:quizNumber', {
            template: '<result-setup></result-setup>',
            css: 'admin/result-setup/result-setup-page.css',
            resolve: {
                currentUser: ['userAuthService', function (auth) {
                    return auth.currentUser();
                }]
            }
        });
        $routeProvider.when('/edit-result/:gameId', {
            template: '<result-editor></result-editor>',
            css: 'admin/result-editor/result-editor.css',
            resolve: {
                currentUser: ['userAuthService', function (auth) {
                    return auth.currentUser();
                }]
            }
        });
        $routeProvider.when('/show-result/:gameId', {
            template: '<show-result></show-result>',
            css: 'admin/show-result/show-result.css'
        });
        $routeProvider.when('/round-status/:gameId', {
            template: '<round-status></round-status>',
            resolve: {
                currentUser: ['userAuthService', function (auth) {
                    return auth.currentUser();
                }]
            }
        });
        $routeProvider.when('/show-team-result/:gameId/:teamId', {
            template: '<show-team-result></show-team-result>',
            css: 'admin/show-team-result/show-team-result.css'
        });
        $routeProvider.when('/login', {
            template: '<login></login>',
            css: 'admin/login/login.css'
        });
        $routeProvider.when('/login-panel', {
            template: '<login-panel></login-panel>'
        });
        $routeProvider.when('/game-list', {
            template: '<game-list></game-list>',
            css:'admin/game-list/game-list.css'
        });
        $routeProvider.when('/registration',{
            template:'<application-form></application-form>'
        })
    }])
    .run(["$rootScope", "$location", 'userAuthService', function ($rootScope, $location, userAuthService) {
        $rootScope.$on("$routeChangeError", function () {
            $location.path("/login");
        });
        userAuthService.currentUser().then((res) => {
            $rootScope.currentUser = res.email;
        })
    }]);
