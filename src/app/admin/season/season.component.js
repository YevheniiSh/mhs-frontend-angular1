'use strict';
(function () {
  angular
    .module('season')
    .component('season', {
      templateUrl: 'app/admin/season/season.html',
      css: 'app/admin/season/season.css',
      controller: seasonsController
    });

  seasonsController.$inject = ['$location', 'seasonService', '$routeParams', '$window', 'userAuthService',
    'NotificationService', 'CustomConfirmationService'];

  function seasonsController($location, seasonService, $routeParams, $window, userAuthService,
                             notificationService, customConfirmationService) {

    let vm = this;

    let seasonId = $routeParams.seasonId;

    vm.showCloseSeasonAlert = false;

    vm.$onInit = onInit;

    function onInit() {

      seasonService.getContenderTeams(seasonId).then((res) => {
        vm.seasonTeams = res;
      });

      seasonService.getDropOutTeams(seasonId).then((res) => {
        vm.seasonDropTeams = res
      });

      seasonService.getCurrentSeason().then(season => {
        if (season) {
          if (season.$id === seasonId) {
            vm.isCurrentSeason = true;

            seasonService.hasOpenGames(seasonId).then((res) => {
              vm.hasOpenGames = res
            });
          }
        }
      });

      userAuthService.currentUser().then(res => {
        vm.admin = res;
      })
    }

    vm.closeCurrentSeason = function () {
      if (!vm.hasOpenGames)
        showSeasonCloseConfirmation();
      else
        notificationService.showError('SEASON_OPEN_GAMES_ALERT');
    };

    function showSeasonCloseConfirmation() {
      customConfirmationService.create('CONFIRMATION_CLOSE_SEASON').then((res) => {
        if (res.resolved)
          seasonService.finishSeason(seasonId).then((seasonStatus) => {
            vm.isCurrentSeason = seasonStatus
          });
      });
    }

    vm.onBack = function () {
      $window.history.back();
    };
  }
})();
