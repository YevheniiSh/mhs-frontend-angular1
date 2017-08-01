'use strict';
angular.module('resultSetup')
    .component('resultSetup', {
        templateUrl: 'admin/result-setup/result-setup-page.html',
        controller: function ResultSetupController(resultSetupService, $routeParams) {
            let vm = this;
            let gameId = $routeParams.gameId;
            vm.quizNumber = $routeParams.quizNumber;
            vm.currentRound = $routeParams.roundNumber;
            vm.teamsScore = [];
            resultSetupService.getData(gameId)
                .then((game) => {
                    vm.quizzes = [];
                    vm.teams = game.teams;
                    for (let i = 1; i <= game.rounds[parseInt(game.currentRound)]; i++) {
                        vm.quizzes.push({number: i, answered: false});
                    }
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
                angular.forEach(vm.teams, function (team, key) {
                    results.push(new Result(vm.currentRound, vm.quizNumber, key));
                });
                angular.forEach(results, function (result, key) {
                    if (vm.teamsScore[key]) {
                        resultSetupService.setQuizResult(result, vm.teamsScore[key]);
                    }
                    else {
                        resultSetupService.setQuizResult(result, 0);
                    }

                });
                vm.quizzes[vm.quizNumber - 1].answered = true;
                if (vm.quizNumber  !== vm.quizzes.length) {
                    vm.quizNumber++;
                    vm.setQuiz(vm.quizNumber);
                }
            };
        }
    });