angular
    .module('mhs.player', [
        'ngRoute',
        'teamRegisterForm'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/registration/:gameId',{
            template: '<team-register-form></team-register-form>'
        });
    }]);