angular.module('gameResultsPage')
    .component('gameResults', {
        templateUrl: 'admin/game-results/game-results.html',
        controller: ['GameServiceFactory','ResultServiceFactory', '$rootScope', '$routeParams', '$location', function (GameService, ResultService, $rootScope, $routeParams, $location) {
            this.isPresentationMode = $rootScope.presentationMode;

            this.getDetails = function (teamResult) {
                if (!this.isPresentationMode) {
                    console.log(teamResult.teamId);
                    $location.path(`/games/${$routeParams.gameId}/results/${teamResult.teamId}`);
                }
            };

            ResultService.getParsedResults($routeParams.gameId)
                .then((result) => {
                    this.results = result;
                    console.log(result)
                });

            this.getTeamGames = function(teamId){
                $location.path(`/teams/${teamId}`);
            }
        }]
});