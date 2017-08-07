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

        // vm.getQuizClass = function (quizNumber) {
        //     if (quizNumber === selectedQuiz) return 'btn btn-info';
        //     angular.forEach(vm.game.results,(result)=>{
        //         if (result.round == vm.selectedRound && result.quiz == quizNumber){
        //             return 'btn btn-success';
        //         }
        //     })
        //     getGame()
        //         .then((res) => {
        //             for (let i = 0; i < res.results.length; i++) {
        //                 if (res.results[i].round == vm.selectedRound && res.results[i].quiz == quizNumber) {
        //                     return 'btn btn-success';
        //                 }
        //             }
        //         })
        // };
    }
})();