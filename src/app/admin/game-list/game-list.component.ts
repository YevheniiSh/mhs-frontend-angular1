import 'angular';
import 'angular-route';

declare const angular: any;

(function () {
  'use strict';
  angular.module('mhs.admin')
    .component('gameList', {
      templateUrl: 'admin/game-list/game-list.html',
      controller: GameList
    });

  // GameList.$inject = ['GameServiceFactory', '$location', 'userAuthService'];

  function GameList(GameServiceFactory, $location, userAuthService) {
    let vm = this;
    vm.$onInit = onInit;

    vm.openGameInfo = function (gameId) {
      $location.path('/game-results/' + gameId)
    };

    function onInit() {
      GameServiceFactory
        .getAllFinishedGames()
        .then((games) => {
          this.games = games;
          this.games.forEach((item) => {
            item.date = new Date(item.date);
          });
        });
      getIndexTab();
    }

    function getIndexTab() {
      vm.tabs = ['open', 'current', 'finished'];

      vm.activeTab = Object.keys($location.search()).find(k => /open|current|finished/.test(k));
      if (vm.activeTab === undefined)
        vm.activeTab = 'open';
    }

    vm.updateUrlPath = function (key) {
      $location.search(key);
    };

    vm.auth = false;
    userAuthService.currentUser().then((res) => {
      vm.auth = true;
    }).catch((err) => {
      vm.auth = false;
    });
  }
})();
