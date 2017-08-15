(function () {
    angular
        .module('game-list')
        .component('currentGameList',
            {
                templateUrl: 'admin/game-list/current-game.html',
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
                    this.games = games;
                    console.log(this.games);
                    this.games.forEach((item) => {
                        item.date = new Date(item.date);
                    });
                })
            vm.auth = false;
            userService.currentUser().then((res) => {
                vm.auth = true;
            }).catch((err) => {
                vm.auth = false;
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