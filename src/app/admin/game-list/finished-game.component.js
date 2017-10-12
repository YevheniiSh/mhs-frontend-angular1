(function () {
  angular
    .module('game-list')
    .component('finishedGameList', {
      templateUrl: 'app/admin/game-list/finished-game.html',
      css: 'app/admin/game-list/finished-game.css',
      controller: FinishedGameListController
    });
  FinishedGameListController.$inject = ['GameServiceFactory', '$location', 'seasonService', 'userAuthService'];

  function FinishedGameListController(gameFactory, $location, seasonService, userService) {
    let vm = this;
    vm.$onInit = onInit;

    vm.openGameInfo = function (gameId) {
      $location.path('/games/' + gameId + '/results')
    };

    function onInit() {
      gameFactory
        .getAllFinishedGames()
        .then((games) => {
          vm.games = games;
          vm.filteredGames = games;

          vm.parseDate();
          vm.games.forEach((item) => {
            gameFactory.getGameTeamsNumber(item.$id)
              .then((teamsNumber) => {
                item.teamsNumber = teamsNumber;
              });
          });

          vm.games.$watch(() => {
            vm.parseDate();
          })
        });

      seasonService.getSeasonsNames().then((res) => {
        vm.seasons = res
      })

    }

    vm.parseDate = function () {
      vm.games.forEach((item) => {
        item.date = new Date(item.date);
      });
    };
    vm.auth = false;

    userService.currentUser()
      .then(() => {
        vm.filteredGames = vm.games;
        vm.auth = true;
      })
      .catch(() => {
        vm.auth = false;
      });

    vm.hasVisibleGames = function () {
      if (vm.games !== undefined) {
        return vm.games.length !== 0 && vm.games.length !== undefined && vm.filteredGames.length !== 0;
      } else {
        return true;
      }
    };
  }
})();
