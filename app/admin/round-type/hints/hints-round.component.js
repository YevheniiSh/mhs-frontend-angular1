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
    'resultSetupService',
    '$routeParams',
    '$location',
    '$scope'
];

function hintsRoundController(resultSetupService, $routeParams, $location, $scope) {
    let vm = this;

    vm.$onInit = onInit;

    function onInit() {
    //     getRound()
    //         .then(getQuizWeight);
    //     initPreviousQuizResults();
    // }
    //
    // function getRound() {
    //     return GameServiceFactory.getRoundByGameAndId($routeParams.gameId, $routeParams.roundNumber);
    // }
    //
    // function getQuizWeight(round) {
    //     vm.weight = round.roundType.start + (round.roundType.step * ($routeParams.quizNumber - 1));
    // }
    //
    // function initPreviousQuizResults() {
    //     ResultServiceFactory.getByRoundAndQuiz(
    //         $routeParams.roundNumber,
    //         $routeParams.quizNumber-1,
    //         $routeParams.gameId
    //     )
    //         .then(results=>{
    //             vm.previousQuizResults = results;
    //         })
    // }
    //
    // vm.inDisabled = function(teamId) {
    //
    }
}
