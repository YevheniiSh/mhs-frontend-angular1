'use strict';
angular.module('gameType')
    .component('gameType', {
            templateUrl: 'admin/game-build/game-type/game-type.html',
            controller: ['GameServiceFactory', '$routeParams', '$location',
                function (GameService, $routeParams, $location) {


                    let vm = this;

                    let rounds = [];
                    vm.rounds = rounds;
                    vm.gameDate = new Date();

                    let quizSequenceNumber;

                    vm.changeRoundCount = function (count) {
                        quizSequenceNumber = 1;

                        let tempRounds = rounds.splice(0, rounds.length);

                        for (let i = 0; i < count; i++) {
                            if (tempRounds.length > i) {
                                rounds.push(tempRounds[i])

                            } else {
                                let quiz = {sequenceNumber: quizSequenceNumber, quizzess: 10, roundName: "text"};
                                rounds.push(quiz);
                            }
                            quizSequenceNumber++
                        }
                        tempRounds.slice(0, tempRounds.length)
                    };

                    vm.buildGame = function () {

                        let gameId = $routeParams.gameId;
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

                }]
        }
    );
