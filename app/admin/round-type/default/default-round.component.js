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
                .then(getWeightOfResponse);

            initDefaultNumberOfCorrectAnswers();
        }

        function initDefaultNumberOfCorrectAnswers() {
            $scope.$watch(() => {
                return vm.results;
            }, (results) => {
                if (results !== undefined) {
                    results.forEach((result) => {
                        result.numberOfCorrectAnswers === undefined ? result.numberOfCorrectAnswers = 0 : result.numberOfCorrectAnswers
                    });
                }
            })
        }

        function getWeightOfResponse(quizzes) {
            quizzes.forEach((quiz) => {
                if (quiz.weightOfResponse !== undefined) {
                    vm.isManualInput = true;
                }
                vm.weightOfResponse = quiz.weightOfResponse;
            })
        }

        function getQuizResults() {
            return resultSetupService.getQuizResults($routeParams.roundNumber, vm.selectedQuiz, $routeParams.gameId);
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
            vm.results.forEach((result) => {
                result.score = calculateScore(result);
                save(result);
            })
        };
    }
})();