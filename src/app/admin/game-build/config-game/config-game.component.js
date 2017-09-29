'use strict';
(function () {
  angular.module('configGame')
    .component('configGame', {
      templateUrl: 'app/admin/game-build/config-game/config-game.html',
      css: 'app/admin/game-build/config-game/config-game.css',
      controller: ConfigGameController
    });

  ConfigGameController.$inject = ['$location', 'OpenGameServiceFactory', '$routeParams', '$locale', 'convertServiceFactory', 'NotificationService'];

  function ConfigGameController($location, OpenGameService, $routeParams, $locale, convertService, NotificationService) {
    let vm = this;
    let gameId = $routeParams.gameId;
    this.location = "";

    vm.$onInit = onInit;

    function onInit() {
      vm.isCalendarVisible = false;
      vm.isTimeVisible = false;
      vm.saved = false;
      vm.options = {};
      vm.options.minDate = new Date();
      vm.options.startingDay = $locale.DATETIME_FORMATS.DAY.FIRSTDAYOFWEEK = 1;
      vm.isMeridian = false;

      OpenGameService.getDate(gameId).then((res) => {
        vm.gameDate = new Date(res);
      });

      OpenGameService.getTime(gameId).then((res) => {
        vm.gameTime = res;
      });

      OpenGameService.getLocation(gameId).then((res) => {
        vm.location = res;
      });

      getIndexTab();
    }

    function getIndexTab() {
      vm.tabs = ['teams', 'rounds'];

      vm.activeTab = Object.keys($location.search()).find(k => /teams|rounds/.test(k));
      if (vm.activeTab === undefined) vm.activeTab = 'teams';
    }

    vm.getTimeForView = function () {
      return convertService.convertTimeForView(vm.gameTime);
    };

    vm.updateDateAndLocation = function () {
      OpenGameService.changeLocation(gameId, vm.location);
      OpenGameService.changeDate(gameId, vm.gameDate);
      OpenGameService.changeTime(gameId, vm.gameTime);
      vm.saved = true;
    };

    vm.onBack = function () {
      $location.path("/games");
    };

    vm.updateUrlPath = function (key) {
      $location.search(key);
    };

    vm.changeLocation = function () {
      saveLocation();
    };

    function saveLocation() {
      OpenGameService.changeLocation(gameId, vm.location).then(() => {
        NotificationService.showSuccess('SAVE_LOCATION_MESSAGE');
      });
    }

    function saveDate() {
      OpenGameService.changeDate(gameId, vm.gameDate).then(() => {
        NotificationService.showSuccess('SAVE_DATE_MESSAGE');
      });
    }

    function saveTime() {
      OpenGameService.changeTime(gameId, vm.gameTime).then(() => {
        NotificationService.showSuccess('SAVE_TIME_MESSAGE');
      });
    }

    vm.openCalendarPiker = function () {
      if (!isCalendarPikerOpen()) vm.isCalendarVisible = true;
    };

    vm.openTimePiker = function () {
      if (!isTimePikerOpen()) vm.isTimeVisible = true;
    };

    vm.closeCalendarPiker = function () {
      isCalendarPikerOpen();
    };

    vm.closeTimePiker = function () {
      isTimePikerOpen();
    };


    function isTimePikerOpen() {
      if (vm.isTimeVisible) {
        saveTime();
        vm.isTimeVisible = false;
        return true;
      }
      return false;
    }

    function isCalendarPikerOpen() {
      if (vm.isCalendarVisible) {
        saveDate();
        vm.isCalendarVisible = false;
        return true;
      }
      return false;
    }
  }
})();
