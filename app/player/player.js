angular
    .module('mhs.player', [
        'ngRoute',
        'teamRegisterForm',
        'teamGamesList'])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/games/:gameId/registration', {
                template: '<team-register-form></team-register-form>'
            });
            $routeProvider.when('/teams/:teamId', {
                template: '<team-games-list></team-games-list>',
            })
        }]);