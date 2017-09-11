(function () {
    angular
        .module('game-list')
        .component('currentGameList',
            {
                templateUrl: 'admin/game-list/current-game.html',
                css: 'admin/game-list/current-game.css',
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

                    for (let game of games) {
                        game.hasUnfinishedRound = hasUnfinishedRound(game)
                    }

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

        function hasUnfinishedRound(game) {
            let roundCount = game.rounds.length - 1;
            return !(roundCount < game.currentRound)
        }

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