angular.module('gameResultsPage')
    .component('gameResults', {
        templateUrl: 'admin/game-results/game-results.html',
        controller: ['GameServiceFactory','ResultServiceFactory', '$rootScope', '$routeParams', '$location', function (GameService, ResultService, $rootScope, $routeParams, $location) {
            this.getDetails = function (teamResult) {
                if (!$rootScope.presentationMode) {
                    console.log(teamResult.teamId);
                    $location.path(`/games/${$routeParams.gameId}/results/${teamResult.teamId}`);
                }
            };
            this.$onInit = onInit;
            function onInit() {
                this.gameId = $routeParams.gameId;

                GameService.getGameStatus(this.gameId).then(status => {
                    if (status === "current")
                        GameService.getDate(status, this.gameId).then(v => this.date = new Date(v.$value).toLocaleDateString());
                    if (status === "finished")
                        GameService.getDate(status, this.gameId).then(v => this.date = new Date(v.$value).toLocaleDateString())
                });
            }

            ResultService.getParsedResults($routeParams.gameId)
                .then((result) => {
                    this.results = result;
                });
        }]
});