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
    'firebaseConnection',
    'resultSetup',
    'firebase',
    'firebaseDataService'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/add-teams'});
}]);
