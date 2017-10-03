'use strict';

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
  'gameTemplateService',
  'gameBuildService',
  'convertService',
  'roundTypeService',
  'seasonService'
])
  .config(['$locationProvider', '$routeProvider', '$animateProvider',
    function ($locationProvider, $routeProvider, $animateProvider) {
      $animateProvider.classNameFilter(/animated/);
      $locationProvider.html5Mode(true).hashPrefix('!');
      $routeProvider.otherwise({redirectTo: '/games'});
    }]);
