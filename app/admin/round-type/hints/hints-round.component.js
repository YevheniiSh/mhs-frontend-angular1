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
        vm.weight = round.roundType.start - (round.roundType.step * ($routeParams.quizNumber - 1));
        console.log(vm.weight);
    }

    function initPreviousQuizResults() {
        ResultServiceFactory.getByRoundAndQuiz(
            $routeParams.roundNumber,
            $routeParams.quizNumber - 1,
            $routeParams.gameId
        )
            .then(results => {
                vm.previousQuizResults = results;
            })
    }

    vm.isDisabled = function (teamId) {
        if (!isFirstQuiz()) {
            let resultKey = [$routeParams.roundNumber, $routeParams.quizNumber - 1, teamId].join('_');
            return +vm.previousQuizResults[resultKey] || vm.previousQuizResults[resultKey] === undefined;
        }
        return false;
    };

    function isFirstQuiz() {
        return $routeParams.quizNumber === '1';
    }


}
