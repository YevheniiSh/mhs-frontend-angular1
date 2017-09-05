angular.module('resultSetup')
    .component('captainRound', {
        templateUrl: 'admin/round-type/captain/captain-round-type.html',
        css: 'admin/round-type/captain/captain-round-type.css',
        controller: CaptainRoundTypeController,
        bindings: {
            results: '=',
            saveResult: '&'
        },
    });

CaptainRoundTypeController.$inject = [
    '$routeParams',
    'GameServiceFactory'
];

function CaptainRoundTypeController($routeParams, GameServiceFactory) {
    let vm = this;

    vm.$onInit = onInit;

    function onInit() {
        getRound()
            .then(getQuizWeight);
    }

    function getRound() {
        return GameServiceFactory.getRoundByGameAndId($routeParams.gameId, $routeParams.roundNumber);
    }

    function getQuizWeight(round) {
        vm.weight = round.roundType.start + (round.roundType.step * ($routeParams.quizNumber - 1));
    }

}