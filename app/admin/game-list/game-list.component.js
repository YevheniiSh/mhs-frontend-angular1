'use strict';
angular.module('game-list')
    .component('gameList', {
        templateUrl: 'admin/game-list/game-list.html',
        controller:['GameServiceFactory'  ,function (gameFactory) {
            this.games = [];
                gameFactory.getAllFinishedGames().then((games)=>{
                    angular.forEach(games, (game)=>{
                        this.games.push(game);
                    });
                })

            }]
    });