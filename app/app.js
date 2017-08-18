'use strict';

// Declare app level module which depends on views, and components
angular.module('mhs', [
    'ngRoute',
    'ngMessages',
    'mhs.admin',
    'mhs.player',
    'angularCSS',
    'teamFactory',
    'gameFactory',
    'resultSetup',
    'firebaseDataService',
    'userAuthService',
    'internalisation',
    'openGameService',
    'gameRequestService',
    'teamRequestService',
    '720kb.socialshare'
])
    .config(['$locationProvider', '$routeProvider', '$animateProvider',
        function ($locationProvider, $routeProvider, $animateProvider) {
            $animateProvider.classNameFilter(/animated/);
            $locationProvider.hashPrefix('!');
            $routeProvider.otherwise({redirectTo: '/games'});
        }]);
