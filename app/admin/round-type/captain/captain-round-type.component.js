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
    'GameServiceFactory',
    'ResultServiceFactory'
];

function CaptainRoundTypeController($routeParams, GameServiceFactory,ResultServiceFactory) {
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
        vm.weight = round.roundType.start + (round.roundType.step * ($routeParams.quizNumber - 1));
    }

    function initPreviousQuizResults() {
        ResultServiceFactory.getByRoundAndQuiz(
            $routeParams.roundNumber,
            $routeParams.quizNumber-1,
            $routeParams.gameId
        )
            .then(results=>{
                vm.previousQuizResults = results;
            })
    }

    vm.inDisabled = function(teamId) {
        if(!isFirstQuiz()){
            let resultKey = [$routeParams.roundNumber, $routeParams.quizNumber-1, teamId].join('_');
            if(vm.previousQuizResults[resultKey] === 0 || vm.previousQuizResults[resultKey] === undefined){
                return true;
            }
            else {
                return false;
            }
        }
    };
    
    function isFirstQuiz() {
        if($routeParams.quizNumber === 1){
            return true;
        } else {
            return false;
        }
    }

}