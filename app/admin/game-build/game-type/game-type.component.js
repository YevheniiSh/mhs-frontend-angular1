'use strict';
angular.module('gameType')
    .component('gameType', {
            templateUrl: 'admin/game-build/game-type/game-type.html',
            controller: ['GameServiceFactory', '$routeParams', '$location', '$rootScope',
                function (GameService, $routeParams, $location, $rootScope) {

                    let vm = this;
                    let rounds = [];
                    let quizSequenceNumber = 1;

                    vm.changeRoundCount = function (count) {
                        quizSequenceNumber = 1;
                        rounds.splice(0, rounds.length);
                        for (let i = 0; i < count; i++) {
                            let quiz = {sequenceNumber: quizSequenceNumber++, quizzess: 10};
                            rounds.push(quiz);
                        }

                    };

                    vm.rounds = rounds;

                    vm.buildGame = function () {
                        let gameId = $routeParams.gameId;
                        GameService
                            .getGameById(gameId)
                            .then((res) => {
                                let game = GameService.convertFromFirebase(res.val());


                                let gameBuilder = new GameBuilder(game);
                                let roundArray = [];

                                for (let i = 0; i < rounds.length; i++) {

                                    roundArray.push(rounds[i].quizzess);
                                }
                                gameBuilder.addRoundsArray(roundArray);

                                GameService.save(gameBuilder.game, gameId);

                                $location.path('/round-status/' + gameId);
                                $rootScope.$apply();
                            });
                    };

                }]
        }
    );