(function () {
    angular.module('resultSetup')
        .component('defaultRound', {
            templateUrl: 'admin/round-type/default/default-round.html',
            css: 'admin/round-type/default/default-round.css',
            controller: DefaultRoundController,
            bindings: {
                results: '=',
                isManualInput: '='
            }
        });

    DefaultRoundController.$inject = ['$routeParams', 'DefaultRoundFactory', 'resultSetupService', '$scope'];

    function DefaultRoundController($routeParams, DefaultRoundFactory, resultSetupService, $scope) {
        let vm = this;

        vm.$onInit = onInit;

        function onInit() {
            vm.selectedQuiz = $routeParams.quizNumber;

            getQuizResults()
                .then((results) => {
                    if (results[Object.keys(results)[4]] !== null) {
                        getWeightOfResponse(results[Object.keys(results)[4]])
                    }
                })
        }

        function getQuizResults() {
            return resultSetupService.getQuizResults($routeParams.roundNumber, vm.selectedQuiz, $routeParams.gameId);
        }

        function getWeightOfResponse(result) {
            if (result.weightOfResponse !== undefined) {
                vm.isManualInput = true;
            }
            vm.weightOfResponse = result.weightOfResponse;
        }

        function calculateScore(result) {
            return Math.floor(result.numberOfCorrectAnswers * vm.weightOfResponse * 100) / 100
        }

        function save(result) {
            result.weightOfResponse = vm.weightOfResponse;
            if (result.weightOfResponse === undefined) {
                resultSetupService.saveQuizResult(result, $routeParams.gameId);
            } else {
                DefaultRoundFactory.saveQuizResult(result, $routeParams.gameId);
            }
        }

        vm.saveResult = function (result) {
            if (vm.isManualInput) {
                result.score = calculateScore(result);
                save(result);
                return;
            }
            save(result);
        };

        vm.recalculateScore = function () {
            for (let result of vm.results) {
                if (result.numberOfCorrectAnswers === undefined) {
                    result.numberOfCorrectAnswers = 0;
                    continue;
                }
                if (result.numberOfCorrectAnswers === 0) {
                    continue;
                }
                result.score = calculateScore(result);
                save(result);
            }
        };

        vm.selectAllContent = function ($event) {
            $event.target.select();
        };
    }
})();