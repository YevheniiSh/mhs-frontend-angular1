(function () {
    angular
        .module('roundStatus')
        .component('roundStatus', {
            templateUrl: 'admin/round-status/round-status.html',
            css: 'admin/round-status/round-status.css',
            controller: RoundStatusController
        });

    RoundStatusController.$inject = ['$routeParams', '$location', 'RoundStatusService', 'GameServiceFactory', 'ResultServiceFactory'];

    function RoundStatusController($routeParams, $location, RoundStatusService, GameService, ResultService) {
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
                if (status === 'finished') {
                    $location.path('/game-list');
                }
            });

        vm.onFinished = function () {
            ResultService.setGameWinner(vm.gameId)
                .then(() => {
                    GameService.finishGame(vm.gameId);
                });

        };

        vm.onPublished = function () {
            GameService.publishGame(vm.gameId);
        };

        GameService
            .getCurrentRound($routeParams.gameId)
            .then((currentRound) => {

                RoundStatusService
                    .getRounds($routeParams.gameId)
                    .then((rounds) => {
                        console.log(rounds);
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
                vm.startRoundTooltip = 'Click to start';
            }, (err) => {
                console.error(err)
            });
    }
})();