(function () {
    angular
        .module('roundStatus')
        .component('roundStatus', {
          templateUrl: 'app/admin/round-status/round-status.html',
          css: 'app/admin/round-status/round-status.css',
            controller: RoundStatusController
        });

    RoundStatusController.$inject = [
        '$routeParams',
        '$location',
        'RoundStatusService',
        'GameServiceFactory',
        'ResultServiceFactory',
        'seasonService'
    ];

    function RoundStatusController($routeParams, $location, RoundStatusService, GameService, ResultService, seasonService) {
        let vm = this;
        let nextRounds = [];
        let prevRounds = [];

        vm.startRoundTooltip = false;

        vm.checked = false;

        vm.nextRounds = nextRounds;
        vm.prevRounds = prevRounds;
        vm.gameId = $routeParams.gameId;

        GameService.getGameStatus(vm.gameId)
            .then((status) => {
                vm.status = status;
                if (status === 'finished') {
                    $location.path('/games');
                }
            });

        vm.onFinished = function () {
            ResultService.setGameWinner(vm.status, vm.gameId)
                .then(() => {
                    return ResultService.setTeamPosition(vm.gameId)
                })
                .then(() => {
                    GameService.finishGame(vm.gameId);
                    seasonService.finishGame(vm.gameId);
                })
                .then(() => {
                    $location.path("games/" + vm.gameId + "/results")
                });

        };

        GameService
            .getCurrentRound($routeParams.gameId)
            .then((currentRound) => {

                RoundStatusService
                    .getRounds($routeParams.gameId)
                    .then((rounds) => {
                        rounds.forEach((item) => {
                            if (item.$id > currentRound) {
                                nextRounds.push(item);
                            } else if (item.$id < currentRound) {
                                prevRounds.push(item);
                            } else {
                                vm.currentRound = item;
                            }
                        });
                        if (prevRounds.length === rounds.length) {
                            vm.checked = true;
                        }
                    });
            }, (err) => {
                console.error(err)
            });
    }
})();
