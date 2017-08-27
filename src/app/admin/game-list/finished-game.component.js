(function () {
    angular
        .module('game-list')
        .component('finishedGameList',
            {
              templateUrl: 'app/admin/game-list/finished-game.html',
                controller: FinishedGameListController
            });
    FinishedGameListController.$inject = ['GameServiceFactory', '$location'];

    function FinishedGameListController(gameFactory, $location) {
        let vm = this;
        vm.$onInit = onInit;

        vm.openGameInfo = function (gameId) {
            $location.path('/games/' + gameId + '/results')
        };

        function onInit() {
            gameFactory
                .getAllFinishedGames()
                .then((games) => {
                    this.games = games;
                    vm.parseDate();
                    this.games.$watch(() => {
                        vm.parseDate();
                    })
                })

        };

        vm.parseDate = function () {
            vm.games.forEach((item) => {
                item.date = new Date(item.date);
            });
        };
    }
})();
