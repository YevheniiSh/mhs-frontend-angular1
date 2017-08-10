(function () {
    'use strict';
    angular.module('game-list')
        .component('gameList', {
            templateUrl: 'admin/game-list/game-list.html',
            controller: GameList
        });

    GameList.$inject = ['GameServiceFactory', '$location', 'userAuthService'];

    function GameList(gameFactory, $location, userService) {
        let vm = this;
        vm.$onInit = onInit;

        // vm.openGameInfo = function (gameId) {
        //     $location.path('/show-result/' + gameId)
        // };

        function onInit() {
            // gameFactory
            //     .getAllFinishedGames()
            //     .then((games) => {
            //         this.games = games;
            //         this.games.forEach((item) => {
            //             item.date = new Date(item.date);
            //         });
            //     })
        };

        vm.auth = false;
        userService.currentUser().then((res) => {
            vm.auth = true;
        }).catch((err) => {
            vm.auth = false;
        });
        console.log(this.auth);
    }
})();