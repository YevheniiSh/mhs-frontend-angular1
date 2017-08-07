angular
    .module('roundStatus')
    .component('roundStatus', {
        templateUrl: 'admin/round-status/round-status.html',
        css: 'admin/round-status/round-status.css',
        controller: ['$routeParams', '$location', 'RoundStatusService', 'GameServiceFactory', 'ResultServiceFactory', RoundStatusController]
    });

function RoundStatusController($routeParams, $location, RoundStatusService, GameService, ResultService) {
    let vm = this;
    let nextRounds = [];
    let prevRounds = [];

    vm.checked = false;

    vm.nextRounds = nextRounds;
    vm.prevRounds = prevRounds;
    vm.gameId = $routeParams.gameId;

    GameService.getGameStatus(vm.gameId)
        .then((status) => {
            if (status === 'finished') {
                $location.path('/add-teams');
            }
        });

    vm.onFinished = function () {
        ResultService.setGameWinner(vm.gameId)
            .then((res) => {
                GameService.finishGame(vm.gameId);
            });

    };

    vm.onPublished = function () {
        GameService.publishGame(vm.gameId);
    }

    GameService
        .getCurrentRound($routeParams.gameId)
        .then((currentRound) => {

            RoundStatusService
                .getRounds($routeParams.gameId)
                .then((rounds) => {
                    console.log(rounds);
                    Object.keys(rounds).forEach(key => {
                        if (key > currentRound) nextRounds.push(key);
                        if (key < currentRound) prevRounds.push(key);
                    });
                    if (prevRounds.length === rounds.length - 1) {
                        vm.checked = true;
                    }
                    else {
                        vm.currentRound = currentRound;
                    }
                })

        }, (err) => {
            console.error(err)
        });
}