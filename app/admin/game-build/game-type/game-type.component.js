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

    let quizSequenceNumber = 1;

    vm.addRound = function () {
        let quiz = {sequenceNumber: quizSequenceNumber, quizzess: 10, roundName: ""};
        quizSequenceNumber++;
        rounds.push(quiz);
        debugger;
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

    vm.buildGame = function () {
        debugger;
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

    vm.ChangeCalendarStatus = function () {
        vm.isCalendarVisible ? vm.isCalendarVisible = false : vm.isCalendarVisible = true;
    }
}