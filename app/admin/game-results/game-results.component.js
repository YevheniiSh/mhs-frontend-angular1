angular.module('gameResultsPage')
    .component('gameResults', {
        templateUrl: 'admin/game-results/game-results.html',
        controller: ['ResultServiceFactory', 'GameServiceFactory', '$routeParams', '$location', function (ResultService, GameService, $routeParams, $location) {
            this.getDetails = function (teamResult) {
                console.log(teamResult.teamId);
                $location.path(`/games/${$routeParams.gameId}/results/${teamResult.teamId}`);
            };

            this.gameStatus = true;

            this.gameId = $routeParams.gameId;

            GameService.getGameStatus(this.gameId).then(status => {
                if (status === "current") {
                    this.gameStatus = false;
                    GameService.getDate(status, this.gameId).then(v => {
                        this.date = new Date(v.$value).toLocaleDateString();
                        console.log(this.date);
                    })
                }
                if (status === "finished") {
                    this.gameStatus = true;
                    GameService.getDate(status, this.gameId).then(v => {
                        this.date = new Date(v.$value).toLocaleDateString();
                        console.log(this.date);
                    })
                }

            });

            ResultService.getParsedResults($routeParams.gameId)
                .then((result) => {
                    this.results = result;
                });
        }]
});