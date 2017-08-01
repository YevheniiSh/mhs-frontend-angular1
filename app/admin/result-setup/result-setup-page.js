'use strict';
angular.module('resultSetup')
    .component('resultSetup', {
        templateUrl: 'admin/result-setup/result-setup-page.html',
        controller: function ResultSetupController(resultSetupService, $routeParams, $location, $scope, $window) {
            let vm = this;
            vm.mode = $routeParams.mode;
            if (vm.mode === 'edit') {
                vm.buttonType = 'Upgrade';
            } else if (vm.mode === 'play') {
                vm.buttonType = 'Next';
            }
            let gameId = $routeParams.gameId;
            vm.quizNumber = $routeParams.quizNumber;
            vm.currentRound = $routeParams.roundNumber;
            resultSetupService.getData(gameId)
                .then((game) => {
                    vm.game = game;
                    vm.quizzes = [];
                    vm.teams = game.teams;
                    let quizCount = game.rounds[$routeParams.roundNumber];
                    for (let i = 1; i <= quizCount; i++) {
                        vm.quizzes.push({number: i, answered: false});
                    }
                    angular.forEach(game.results, function (result) {
                        if (result.round === vm.currentRound) {
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
                vm.quizNumber = quizNumber;
                vm.teamsScore = [];
                resultSetupService.getQuizResult(gameId, vm.currentRound, vm.quizNumber)
                    .then((results) => {
                        angular.forEach(results, function (result) {
                            vm.teamsScore.push(result.score);
                        })
                    })
            };
            vm.setResult = function () {
                let results = [];
                let promices = [];
                angular.forEach(vm.teams, function (team, key) {
                    results.push(new Result(vm.currentRound, vm.quizNumber, key));
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
                        if (vm.quizNumber < vm.quizzes.length) {
                            if (vm.mode === 'play') {
                                vm.quizNumber++;
                                vm.setQuiz(vm.quizNumber);
                            }
                        } else {
                            if (vm.mode === 'play') {
                                if (vm.currentRound < vm.game.rounds.length - 1) {
                                    console.log(vm.game.rounds.length);
                                    resultSetupService.roundIncrement(vm.currentRound, gameId);
                                    $location.path('/round-status/' + gameId);
                                } else {
                                    $location.path('/round-status/' + gameId);
                                }
                            }
                        }
                    }).then($scope.$apply);
            };
            vm.back = function () {
                $window.history.back();
            }
        }
    });