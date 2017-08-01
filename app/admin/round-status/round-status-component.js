angular
    .module('roundStatus')
    .component('roundStatus', {
        templateUrl: 'admin/round-status/round-status.html',
        css: 'admin/round-status/round-status.css',
        controller: ['$routeParams', 'RoundStatusService', RoundStatusController]
    });

function RoundStatusController($routeParams, RoundStatusService) {
    let vm = this;
    let nextRounds = [];
    let prevRounds = [];

    vm.nextRounds = nextRounds;
    vm.prevRounds = prevRounds;
    vm.gameId = $routeParams.gameId;

    RoundStatusService
        .getCurrentRound($routeParams.gameId)
        .then((currentRound) => {
            vm.currentRound = currentRound;

            RoundStatusService
                .getRounds($routeParams.gameId)
                .then((rounds) => {
                    Object.keys(rounds).forEach(key => {
                        if (key > currentRound) nextRounds.push(key);
                        if (key < currentRound) prevRounds.push(key);
                    });
                })

        }, (err) => {
            console.error(err)
        });
}