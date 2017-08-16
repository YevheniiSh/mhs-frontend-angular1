angular
    .module('mhs.player', [
        'ngRoute',
        'teamRegisterForm'])
    .config(['$routeProvider', function ($routeProvider) {
              $routeProvider.when('/games/:gameId/registration',{
            template: '<team-register-form></team-register-form>'
        });
    }]);