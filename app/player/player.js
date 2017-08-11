angular
    .module('mhs.player', [
        'ngRoute',
        'applicationForm'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/example', {
            templateUrl: 'player/some-feature/some-feature-html.html',
            controller: 'SomeFeatureController'
        });

        $routeProvider.when('/registration/:gameId',{
            template:'<application-form></application-form>'
        });
    }]);