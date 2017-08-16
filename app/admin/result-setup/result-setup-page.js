'use strict';
(function () {
    angular.module('resultSetup')
        .component('resultSetup', {
            templateUrl: 'admin/result-setup/result-setup-page.html',
            controller: ResultSetupController
        });

    ResultSetupController.$inject = [
        'resultSetupService',
        '$routeParams',
        '$location'
    ];

    function ResultSetupController(resultSetupService, $routeParams, $location) {
        let vm = this;

        vm.isManualInput = false;
        vm.selectedQuiz = $routeParams.quizNumber;
        vm.$onInit = onInit;

        function onInit() {
            initRound();
            initCurrentRound();
            initCurrentQuiz();
            getTeams()
                .then(() => {
                    buildResults()
                    assignResults()
                        .then(initInputType)
                        .then(saveResults)
                });
        }

        function initInputType() {
            angular.forEach(vm.results, (result) => {
                if (result.score != 0 && result.score != 1) {
                    vm.isManualInput = true;
                }
                ;
            })
        }

        function initRound() {
            resultSetupService.getRound($routeParams.gameId, $routeParams.roundNumber)
                .then((round) => {
                    vm.round = round;
                });
        }

        function initCurrentQuiz() {
            resultSetupService.getCurrentQuiz($routeParams.gameId)
                .then((quiz) => {
                    vm.currentQuiz = quiz;
                })
        }

        function initCurrentRound() {
            resultSetupService.getCurrentRound($routeParams.gameId)
                .then((round) => {
                    vm.currentRound = round;
                })
        }

        function getTeams() {
            return resultSetupService.getGameTeams($routeParams.gameId)
                .then((teams) => {
                    vm.teams = teams;
                });
        }

        function buildResults() {
            vm.results = {};
            angular.forEach(vm.teams, function (team) {
                let resultKey = [vm.round.$id, vm.selectedQuiz, team.teamId].join('_');
                let result = resultSetupService.buildResult(vm.round.$id, vm.selectedQuiz, team.teamId);
                vm.results[resultKey] = result;
                vm.results[resultKey].teamName = team.name;
            });
        }

        function assignResults() {
            return resultSetupService.getQuizResults(vm.round.$id, vm.selectedQuiz, $routeParams.gameId)
                .then((res) => {
                    res.forEach((result, key) => {
                        Object.assign(vm.results[key], result)
                    });
                    vm.results = Object.keys(vm.results).map(it => vm.results[it])
                });
        }

        function saveResults() {
            return resultSetupService.saveQuizResults(vm.results, $routeParams.gameId);
        }

        vm.saveResult = function (result) {
            resultSetupService.saveQuizResult(result, $routeParams.gameId);
        };

        vm.setQuiz = function (quizNumber) {
            let ref = `/games/${$routeParams.gameId}/rounds/${$routeParams.roundNumber}/${quizNumber}`;
            $location.path(ref);
        };

        vm.nextQuiz = function () {
            if (vm.selectedQuiz < vm.round.numberOfQuestions) {
                if (vm.currentQuiz == vm.selectedQuiz) {
                    vm.currentQuiz++;
                    resultSetupService.setCurrentQuiz(vm.currentQuiz, $routeParams.gameId);
                }
                vm.setQuiz(+vm.selectedQuiz + 1);
            } else if (vm.selectedQuiz == vm.round.numberOfQuestions) {
                resultSetupService.roundIncrement(vm.round.$id, $routeParams.gameId)
                    .then(() => {
                        resultSetupService.setCurrentQuiz(1, $routeParams.gameId)
                            .then(() => {
                                $location.path(`/games/${$routeParams.gameId}/rounds`);
                            })
                        }
                    )
            }
        };

        vm.range = function (n) {
            return new Array(n);
        };
    }
})();