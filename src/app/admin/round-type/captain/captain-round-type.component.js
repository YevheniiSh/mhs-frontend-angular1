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
    '$location',
    '$routeParams',
    'GameServiceFactory',
    'ResultServiceFactory',
    'resultSetupService'
];

function CaptainRoundTypeController($location, $routeParams, GameServiceFactory, ResultServiceFactory, resultSetupService) {
    let vm = this;
    vm.noCaptainsAlertDisplay = false;

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
            $routeParams.quizNumber - 1,
            $routeParams.gameId
        )
            .then(results => {
                vm.previousQuizResults = results;
                if (getCaptainsInGameCount(results) === 0 && !isFirstQuiz()){
                    vm.noCaptainsAlertDisplay = true;
                }
            })
    }

    vm.closeAlert = function () {
        vm.noCaptainsAlertDisplay = false;
    };

    vm.isDisabled = function (teamId) {
        if (!isFirstQuiz()) {
            let resultKey = [$routeParams.roundNumber, $routeParams.quizNumber - 1, teamId].join('_');
            if (vm.previousQuizResults[resultKey] === undefined) {
                return true;
            } else if (!+vm.previousQuizResults[resultKey].score) {
                return true;
            }
            return false;
        }
    };

    vm.closeRound = function () {
        resultSetupService.closeRound($routeParams.roundNumber,$routeParams.gameId)
            .then(() => {
                $location.path(`/games/${$routeParams.gameId}/rounds`);
            });
    };

    function getCaptainsInGameCount(results) {
        let captainsCount = 0;
        results.forEach((result)=>{
            if(result.score !== 0){
                captainsCount++;
            }
        });
        return captainsCount;
    };

    function isFirstQuiz() {
        return $routeParams.quizNumber === '1';
    }

}