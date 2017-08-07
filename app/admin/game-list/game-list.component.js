(function () {
    'use strict';
    angular.module('game-list')
        .component('gameList', {
            templateUrl: 'admin/game-list/game-list.html',
            controller: ['GameServiceFactory', 'userAuthService', GameServiceFactory]
        });

    function GameServiceFactory(gameFactory, userService) {
        let vm = this;

        gameFactory
            .getAllFinishedGames()
            .then((games) => {
                this.games = games;
            });

        vm.auth = false;
        userService.currentUser().then((res) => {
            vm.auth = true;
        }).catch((err) => {
            vm.auth = false;
        });
        console.log(this.auth);
    }


})();