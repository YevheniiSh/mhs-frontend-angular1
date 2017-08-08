'use strict';
(function () {
    angular.module('resultSetup')
        .component('resultSetup', {
            templateUrl: 'admin/result-setup/result-setup-page.html',
            controller: ResultSetupController
        });
    ResultSetupController.$inject = ['GameServiceFactory', 'resultSetupService', '$routeParams', '$location'];

    function ResultSetupController(GameServiceFactory, resultSetupService, $routeParams, $location) {
        let vm = this;
        vm.$onInit = onInit;

        let selectedQuiz = parseInt($routeParams.quizNumber);

        function renderGameParams(res) {
            vm.game = res;
            let selectedRound = res.rounds[$routeParams.roundNumber];
            selectedRound.number = $routeParams.roundNumber;
            vm.selectedRound = selectedRound;
            vm.selectedQuiz = selectedQuiz;
            vm.results = [];
            angular.forEach(vm.game.teams, (team, key) => {
                vm.results.push(resultSetupService.createResult(
                    $routeParams.gameId,
                    $routeParams.roundNumber,
                    key));
            });
        }

        function getGame() {
            return GameServiceFactory
                .getGameById($routeParams.gameId);
        }

        function onInit() {
            getGame()
                .then((res) => {
                    renderGameParams(res);
                });
        }

        vm.isManualInput = false;

        vm.range = function (n) {
            return new Array(n);
        };

        vm.setQuiz = function (quizNumber) {
            vm.selectedQuiz = quizNumber;
            $location.path(`/result-setup/${vm.game.$id}/${vm.selectedRound.number}/${vm.selectedQuiz}`);
        };
        vm.next()
    }
})();