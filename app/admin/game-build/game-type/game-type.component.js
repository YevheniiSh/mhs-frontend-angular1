'use strict';
angular.module('gameType')
    .component('gameType', {
        templateUrl: 'admin/game-build/game-type/game-type.html',
        controller: GameType
    });

GameType.$inject = ['GameServiceFactory', '$routeParams', '$location'];

function GameType(GameService, $routeParams, $location) {
    let vm = this;
    vm.$onInit = onInit;

    let rounds = [];
    vm.rounds = rounds;
    vm.gameDate = new Date();
    vm.isCalendarVisible = false;
    let gameId = $routeParams.gameId;

    function onInit() {
        GameService
            .getGameById(gameId)
            .then((res) => {
                if (res.rounds !== undefined) $location.path('/round-status/' + gameId);
            })
    }

    let quizSequenceNumber;

    vm.changeRoundCount = function (count) {
        quizSequenceNumber = 1;

        let tempRounds = rounds.splice(0, rounds.length);

        for (let i = 0; i < count; i++) {
            if (tempRounds.length > i) {
                rounds.push(tempRounds[i])
            } else {
                let quiz = {sequenceNumber: quizSequenceNumber, quizzess: 10, roundName: ""};
                rounds.push(quiz);
            }
            quizSequenceNumber++
        }
        tempRounds.slice(0, tempRounds.length)
    };

    vm.buildGame = function () {
        GameService
            .getGameById(gameId)
            .then((res) => {
                let gameBuilder = new GameBuilder(res);

                gameBuilder.addDate(vm.gameDate);
                gameBuilder.addRoundsArray(rounds);
                GameService.save(gameBuilder.game, gameId);

                $location.path('/round-status/' + gameId);
            });
    };
    vm.deleteRound = function (index) {

        rounds.splice(index - 1, 1);
    };
    vm.ChangeCalendarStatus = function () {
        (vm.isCalendarVisible) ?
            vm.isCalendarVisible = false : vm.isCalendarVisible = true;
    }
}
