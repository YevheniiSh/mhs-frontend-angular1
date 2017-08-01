'use strict';
angular.module('gameType')
    .component('gameType', {
            templateUrl: 'admin/game-build/game-type/game-type.html',
            controller: ['GameServiceFactory', '$routeParams', function (GameService, $routeParams) {

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

                    GameService
                        .getGameById($routeParams.gameId)
                        .then((res) => {

                            console.log(res.val());
                            // res.val().rounds = [];
                            //  game.rounds = [];
                            //  console.dir("game" + res.val());

                            let game = GameService.convertFromFirebase(res.val());
                            console.dir("game  1 " + game   );

                            let gameBuilder = new GameBuilder(game);
                            let roundArray = [];

                            for (let i = 0; i <rounds.length; i++) {


                                roundArray.push(rounds[i].quizzess);
                            }
                            gameBuilder.addRoundsArray(roundArray);
                            console.dir("game builder 2 " + gameBuilder);

                            GameService.save(gameBuilder.game, $routeParams.gameId);
                        });
                };

            }]
        }
    );