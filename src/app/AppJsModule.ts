import 'angular';
import 'angular-route';
import 'angular-css';
import 'angular-socialshare';
import { mhsAdmin } from "./admin/admin";
import { userAuthServiceModule } from "./services/user-auth-service/user-auth-service.module";
import { firebaseDataServiceModule } from "./services/firebase-service/firebase-service.module";

declare const angular: any;

export const AppJsModule = angular.module('AngularJsModule', ['ngRoute',
  mhsAdmin.name,
  // 'mhs.player',
  'angularCSS',
  // 'teamFactory',
  // 'gameFactory',
  // 'resultSetup',
  firebaseDataServiceModule.name,
  userAuthServiceModule.name,
  // 'internalisation',
  // 'openGameService',
  // 'gameRequestService',
  // 'teamRequestService',
  // 'gameBuildService',
  // 'convertService',
  '720kb.socialshare']);

AppJsModule.config(['$locationProvider', '$routeProvider', '$animateProvider',
  function ($locationProvider, $routeProvider, $animateProvider) {
    $animateProvider.classNameFilter(/animated/);
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/games'});
  }]);
