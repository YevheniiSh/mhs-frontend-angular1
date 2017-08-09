'use strict';
angular.module('resultSetup')
    .component('resultSetup', {
        templateUrl: 'admin/result-setup/result-setup-page.html',
        controller: function ResultSetupController(ResultServiceFactory, GameServiceFactory, resultSetupService, $routeParams, $location, $scope, $window) {
            let vm = this;
            let gameId = $routeParams.gameId;
            vm.isManualInput = false;
            vm.quizNumber = $routeParams.quizNumber;
            vm.selectedRound = $routeParams.roundNumber;
            resultSetupService.getData(gameId)
                .then((game) => {
                    vm.quizzes = [];
                    vm.teams = game.teams;
                    vm.currentRound = game.currentRound;
                    vm.currentQuiz = game.currentQuiz;
                    let quizCount = game.rounds[$routeParams.roundNumber].numberOfQuestions;
                    vm.round = game.rounds[$routeParams.roundNumber];
                    for (let i = 1; i <= quizCount; i++) {
                        vm.quizzes.push({number: i, answered: false});
                    }
                    angular.forEach(game.results, function (result) {
                        if (result.round == vm.selectedRound) {
                            vm.quizzes[result.quiz - 1].answered = true;
                        }
                    });
                    if ($routeParams.quizNumber > parseInt(quizCount)) {
                        vm.setQuiz(1);
                    } else {
                        vm.setQuiz($routeParams.quizNumber);
                    }
                    vm.teamsScore = [];
                });

            vm.setQuiz = function (quizNumber) {
                vm.saved = false;
                vm.quizNumber = quizNumber;
                vm.teamsScore = [];
                resultSetupService
                    .getQuizResult(gameId, vm.selectedRound, vm.quizNumber)
                    .then((results) => {
                        GameServiceFactory
                            .getCurrentQuiz(gameId)
                            .then(() => {
                                $location.path(`/result-setup/${gameId}/${vm.selectedRound}/${vm.quizNumber}`);
                                angular.forEach(results, function (result) {
                                    vm.teamsScore.push(result.score);
                                    vm.isManualInput = getInputType(results);
                                });
                            })
                    });
            };

            function getInputType(results) {
                let maxScore = 0;
                angular.forEach(results, (result) => {
                    if (maxScore < result.score) maxScore = result.score;
                });
                return !(maxScore === 1 || maxScore === 0);
            }

            vm.setResult = function () {
                let results = [];
                let promices = [];
                angular.forEach(vm.teams, function (team, key) {
                    results.push(new Result(vm.selectedRound, vm.quizNumber, key));
                });
                vm.quizzes[vm.quizNumber - 1].answered = true;
                angular.forEach(results, function (result, key) {
                    if (vm.teamsScore[key] === undefined) {
                        promices.push(resultSetupService.setQuizResult(result, 0));
                    } else {
                        promices.push(resultSetupService.setQuizResult(result, vm.teamsScore[key]));
                    }
                });
                Promise.all(promices)
                    .then(() => {
                        vm.saved = true;
                        if (vm.quizNumber < vm.quizzes.length) {
                            vm.quizNumber++;
                            vm.setQuiz(vm.quizNumber);
                            GameServiceFactory.setCurrentQuiz(vm.quizNumber, gameId)
                        } else {
                            GameServiceFactory.setCurrentQuiz(1, gameId).then(() => {
                                resultSetupService.roundIncrement(vm.selectedRound, gameId);
                                $location.path('/round-status/' + gameId);
                            })

                        }
                    });
            };
            vm.back = function () {
                $window.history.back();
            };

            this.gameId = $routeParams.gameId;

            this.setTeamResult = function (score, teamId){

                let result = {
                    quiz: this.quizNumber,
                    round: this.currentRound,
                    score: score,
                    teamId: teamId
                };
                ResultServiceFactory.saveResult(result, this.gameId);
            }
        }
    });