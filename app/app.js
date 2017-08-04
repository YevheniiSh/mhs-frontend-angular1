'use strict';

// Declare app level module which depends on views, and components
let app = angular.module('mhs', [
    'ngRoute',
    'mhs.admin',
    'mhs.player',
    'mhs.version',
    'angularCSS',
    'teamFactory',
    'gameFactory',
    'resultSetup',
    'firebaseDataService',
    'userAuthService'

]);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/add-teams'});
}]);

