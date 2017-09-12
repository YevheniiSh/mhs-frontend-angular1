angular.module('resultSetup')
    .component('hintsRound', {
        templateUrl: 'admin/round-type/hints/hints-round.html',
        css: 'admin/round-type/hints/hints-round.css',
        controller: hintsRoundController,
        bindings: {
            results: "=",
            saveResult: "&"
        }
    });

hintsRoundController.$inject = [
    '$routeParams',
    'GameServiceFactory',
    'ResultServiceFactory'
];

function hintsRoundController($routeParams, GameServiceFactory, ResultServiceFactory) {
    let vm = this;

    vm.$onInit = onInit;

    function onInit() {
        getRound()
            .then(getQuizWeight);
        initPreviousQuizResults();
    }

    function getRound() {
        return GameServiceFactory.getRoundByGameAndId($routeParams.gameId, $routeParams.roundNumber);
    }

    function getQuizWeight(round) {
        vm.step = round.roundType.step;
        vm.weight = round.roundType.start - (round.roundType.step * ($routeParams.quizNumber - 1));
    }

    function initPreviousQuizResults() {
        ResultServiceFactory.filter({by: "round", val: $routeParams.roundNumber}, $routeParams.gameId)
            .then(results => {
                res = {}
                results.forEach(result => {
                    res[result.teamId] = {};
                    res[result.teamId].quizNumber = result.quiz;
                    res[result.teamId].score = result.score;
                })
                vm.previousQuizResults = res;
            })
    }

    vm.isDisabled = function (result) {
        if (!isFirstQuiz()) {
            if (!vm.previousQuizResults[result.teamId] === undefined) {
                return false
            } else {
                if (vm.previousQuizResults[result.teamId].quizNumber < (+$routeParams.quizNumber)) {
                    if (vm.previousQuizResults[result.teamId].score > 0) {
                        result.score = vm.previousQuizResults[result.teamId].score - ((+$routeParams.quizNumber) - vm.previousQuizResults[result.teamId].quizNumber) * vm.step;
                    }
                    else {
                        result.score = 0;
                    }
                    return true
                }
            }
            return false
        }
    };

    vm.clearResult = function (result) {
        let resultKey = [result.round, result.quiz, result.teamId].join('_');
        ResultServiceFactory.deleteResult($routeParams.gameId, resultKey)
    }

    function isFirstQuiz() {
        return $routeParams.quizNumber === '1';
    }


}
