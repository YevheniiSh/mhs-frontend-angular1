'use strict';
angular.module('gameType')
    .component('gameType', {
        templateUrl: 'admin/game-build/game-type/game-type.html',
        css: 'admin/game-build/game-type/game-type.css',
        controller: GameType
    });

GameType.$inject = ['OpenGameServiceFactory', '$routeParams', '$location'];

function GameType(GameService, $routeParams, $location) {
    let vm = this;


    let rounds = [];
    vm.rounds = rounds;
    let gameId = $routeParams.gameId;

    let quizSequenceNumber = 1;

    GameService.getRounds(gameId).then((res) => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            rounds.push(res[i]);
            quizSequenceNumber++;
        }
    });

    vm.addRound = function () {
        let quiz = {$id: quizSequenceNumber, numberOfQuestions: 10, name: ""};
        quizSequenceNumber++;
        rounds.push(quiz);
    };
    vm.deleteRound = function (index) {
        if (rounds.length >= index) {
            for (let i = index - 1; i < rounds.length; i++) {
                rounds[i].$id--;
            }
            quizSequenceNumber--;
        }

        rounds.splice(index - 1, 1);
    };

    vm.saveRounds = function () {
        GameService.addRounds(gameId, rounds)
    };

}