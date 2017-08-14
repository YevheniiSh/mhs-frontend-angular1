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
            for (let i = 0; i < res.length; i++) {
                rounds.push({
                    sequenceNumber: res[i].$id,
                    quizzess: res[i].numberOfQuestions,
                    roundName: res[i].name
                });
                quizSequenceNumber++;
            }
        });

    vm.addRound = function () {
        let quiz = {sequenceNumber: quizSequenceNumber, quizzess: 10, roundName: ""};
        quizSequenceNumber++;
        rounds.push(quiz);
    };
    vm.deleteRound = function (index) {
        if (rounds.length >= index) {
            for (let i = index - 1; i < rounds.length; i++) {
                rounds[i].sequenceNumber--;
            }
            quizSequenceNumber--;
        }

        rounds.splice(index - 1, 1);
    };

    vm.saveRounds = function () {
        GameService.addRounds(gameId, rounds)
    };

}