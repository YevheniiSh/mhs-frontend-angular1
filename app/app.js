'use strict';

// Declare app level module which depends on views, and components
angular.module('mhs', [
    'ngRoute',
    'mhs.admin',
    'mhs.player',
    'mhs.version',
    'angularCSS'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

    $routeProvider.otherwise({redirectTo: '/view1'});
}]);
