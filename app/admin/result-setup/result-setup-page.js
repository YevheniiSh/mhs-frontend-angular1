'use strict';
angular.module('resultSetup')
    .component('resultSetup', {
        templateUrl: 'admin/result-setup/result-setup-page.html',
        controller: function ResultSetupController(GameServiceFactory, resultSetupService, $routeParams, $location, $scope, $window) {
            let vm = this;
            let gameId = $routeParams.gameId;
            vm.quizNumber = $routeParams.quizNumber;
            vm.selectedRound = $routeParams.roundNumber;
            resultSetupService.getData(gameId)
                .then((game) => {
                    vm.quizzes = [];
                    vm.teams = game.teams;
                    vm.currentRound = game.currentRound;
                    vm.currentQuiz = game.currentQuiz;
                    let quizCount = game.rounds[$routeParams.roundNumber].numberOfQuestions;
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
                resultSetupService.getQuizResult(gameId, vm.selectedRound, vm.quizNumber)
                    .then((results) => {
                        GameServiceFactory.getCurrentQuiz(gameId)
                            .then(currentQuiz => {
                                $location.path(`/result-setup/${gameId}/${vm.selectedRound}/${vm.quizNumber}`);
                                angular.forEach(results, function (result) {
                                    vm.teamsScore.push(result.score);
                                })
                            })
                    })
            };
            vm.setResult = function () {
                let results = [];
                let promices = [];
                angular.forEach(vm.teams, function (team, key) {
                    results.push(new Result(vm.selectedRound, vm.quizNumber, key));
                });
                vm.quizzes[vm.quizNumber - 1].answered = true;
                angular.forEach(results, function (result, key) {
                    if (vm.teamsScore[key] == undefined) {
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
                    }).then($scope.$apply);
            };
            vm.back = function () {
                $window.history.back();
            };

            this.gameId = $routeParams.gameId;
            this.inp = {
                value:0,
            };

            this.showRoundAndQuiz = function (teamId) {
                this.info = "R "+ this.currentRound + " Q " + this.quizNumber + " "+ this.gameId  + " " + teamId ;
            };

            this.setTeamResult = function(team, $index) {
                this.inp.value = score;
                let result = {
                    quiz: this.quizNumber,
                    round: this.gameId,
                    score: this.teamsScore[$index],
                    teamId: team
                };
                ResultService.saveResult(result, this.gameId);
            }
        }
    });