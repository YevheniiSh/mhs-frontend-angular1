angular
    .module('mhs.player', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/example', {
            templateUrl: 'player/some-feature/some-feature-html.html',
            controller: 'SomeFeatureController'
        });
    }]);