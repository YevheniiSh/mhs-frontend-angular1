(function () {
    angular
        .module('game-list')
        .component('finishedGameList',
            {
                templateUrl: 'admin/game-list/finished-game.html',
                controller: FinishedGameListController
            });
    FinishedGameListController.$inject = ['GameServiceFactory', '$location'];

    function FinishedGameListController(gameFactory, $location) {
        let vm = this;
        vm.$onInit = onInit;

        vm.openGameInfo = function (gameId) {
            $location.path('/show-result/' + gameId)
        };

        function onInit() {
            gameFactory
                .getAllFinishedGames()
                .then((games) => {
                    this.games = games;
                    this.games.forEach((item) => {
                        item.date = new Date(item.date);
                    });
                })
        };
    }
})();