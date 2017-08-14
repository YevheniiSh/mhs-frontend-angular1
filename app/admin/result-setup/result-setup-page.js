'use strict';
(function () {
    angular.module('resultSetup')
        .component('resultSetup', {
            templateUrl: 'admin/result-setup/result-setup-page.html',
            controller: ResultSetupController
        });

    ResultSetupController.$inject = [
        'GameServiceFactory',
        'resultSetupService',
        '$routeParams',
        '$location'
    ];

    function ResultSetupController(GameServiceFactory, resultSetupService, $routeParams, $location) {
        let vm = this;

        vm.results = [];
        vm.$onInit = onInit;

        let selectedQuiz = parseInt($routeParams.quizNumber);

        function initQuizResults() {
            resultSetupService.initQuizResults('-KrUOSGCVrIPwT4QsaYS', 1, 1)
                .then((res) => {
                    console.log(res)
                });
            console.log(resultSetupService.initQuizResults($routeParams.gameId, $routeParams.roundNumber, $routeParams.quizNumber));
        }

        function initQuiz(game) {
            vm.game = game;
            let selectedRound = game.rounds[$routeParams.roundNumber];
            selectedRound.number = $routeParams.roundNumber;
            vm.selectedRound = selectedRound;
            vm.selectedQuiz = selectedQuiz;
            initQuizResults();
        }

        function assignAnswers() {
            resultSetupService
                .getQuizResult($routeParams.gameId, $routeParams.roundNumber, selectedQuiz)
                .then((res) => {
                    let results = [];
                    res.forEach((result) => {
                        results.push(result);
                    });
                    angular.extend(vm.results, results);
                    console.log(vm.results)
                })
            resultSetupService.gameFactoty.getRoundByGameAndId($routeParams.gameId, 1)
                .then((res) => {
                    console.log(res)
                })
        }

        vm.setQuiz = function (quizNumber) {
            vm.selectedQuiz = quizNumber;
            initQuizResults();
            assignAnswers();
            $location.path(`/result-setup/${$routeParams.gameId}/${$routeParams.roundNumber}/${quizNumber}`);
        };


        function getGame() {
            return GameServiceFactory
                .getGameById($routeParams.gameId);
        }

        function onInit() {
            getGame()
                .then(initQuiz)
                .then(assignAnswers);
        }

        vm.isManualInput = false;

        vm.range = function (n) {
            return new Array(n);
        };
    }
})();