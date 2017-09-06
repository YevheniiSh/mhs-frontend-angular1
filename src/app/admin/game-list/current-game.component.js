(function () {
    angular
        .module('game-list')
        .component('currentGameList',
            {
              templateUrl: 'app/admin/game-list/current-game.html',
              css: 'app/admin/game-list/current-game.css',
                controller: CurrentGameListController
            });
    CurrentGameListController.$inject = ['GameServiceFactory', '$location', 'userAuthService'];

    function CurrentGameListController(gameFactory, $location, userService) {
        let vm = this;
        vm.$onInit = onInit;

        function onInit() {
            gameFactory
                .getAllCurrentGames()
                .then((games) => {
                    vm.games = games;
                    vm.parseDate();
                    vm.games.$watch(() => {
                        vm.parseDate();
                    });
                });


            vm.auth = false;
            userService.currentUser().then((res) => {
                vm.auth = true;
            }).catch((err) => {
                vm.auth = false;
            });
        };

        vm.parseDate = function () {
            vm.games.forEach((item) => {
                item.date = new Date(item.date);
            });
        };

        vm.reOpenGame = function (gameId) {
            gameFactory.reOpenGame(gameId);
        };

        vm.continueGame = function (gameId) {
            $location.path(`/games/${gameId}/rounds`)
        };
    }
})();
