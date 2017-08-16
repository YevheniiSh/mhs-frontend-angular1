'use strict';

// Declare app level module which depends on views, and components
angular.module('mhs', [
    'ngRoute',
    'mhs.admin',
    'mhs.player',
    'mhs.version',
    'angularCSS',
    'teamFactory',
    'gameFactory',
    'resultSetup',
    'firebaseDataService',
    'userAuthService',
    'internalisation',
    'openGameService',
    'gameRequestService',
    'teamRequestService'
])
    .config(['$locationProvider', '$routeProvider', '$animateProvider',
        function ($locationProvider, $routeProvider, $animateProvider) {
            $animateProvider.classNameFilter(/animated/);
            $locationProvider.hashPrefix('!');
            $routeProvider.otherwise({redirectTo: '/games'});
        }]);
