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
            initResults();
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

        function initResults() {
            resultSetupService.getGameTeams($routeParams.gameId)
                .then((teams) => {
                    vm.teams = teams;
                    buildResults(teams);
                });
        }

        function buildResults(teams) {
            vm.results = {};
            angular.forEach(teams, function (team) {
                let resultKey = [vm.round.$id, vm.selectedQuiz, team.teamId].join('_');
                let result = resultSetupService.buildResult(vm.round.$id, vm.selectedQuiz, team.teamId);
                vm.results[resultKey] = result;
            });
            resultSetupService.getQuizResults(vm.round.$id, vm.selectedQuiz, $routeParams.gameId)
                .then((res) => {
                    angular.extend(vm.results, res);
                });
        }

        vm.getTeamNameByResult = function (result) {
            let teamName;
            angular.forEach(vm.teams, function (team) {
                if (result.teamId == team.teamId) {
                    teamName = team.name;
                }
            })
            return teamName;
        }

        vm.setResult = function (result) {
            resultSetupService.saveQuizResult(result, $routeParams.gameId);
        };

        vm.setQuiz = function (quizNumber) {
            let ref = `/result-setup/${$routeParams.gameId}/${$routeParams.roundNumber}/${quizNumber}`;
            $location.path(ref);
        }

        vm.nextQuiz = function () {
            if (vm.selectedQuiz < vm.round.numberOfQuestions) {
                vm.setQuiz(+vm.selectedQuiz + 1);
            } else if (vm.selectedQuiz == vm.round.numberOfQuestions) {
                resultSetupService.roundIncrement(vm.round.$id, $routeParams.gameId)
                    .then(() => {
                            $location.path(`/round-status`);
                        }
                    )
            }
        };

        vm.range = function (n) {
            return new Array(n);
        };
    }
})();