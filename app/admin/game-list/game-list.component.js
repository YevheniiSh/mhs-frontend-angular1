(function () {
    'use strict';
    angular.module('game-list')
        .component('gameList', {
            templateUrl: 'admin/game-list/game-list.html',
            controller: ['GameServiceFactory', GameServiceFactory]
        });

    function GameServiceFactory(gameFactory) {
        gameFactory
            .getAllFinishedGames()
            .then((games) => {
                this.games = games;
            })
    }
})();