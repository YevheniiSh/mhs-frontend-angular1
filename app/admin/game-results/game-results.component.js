angular.module('gameResultsPage')
    .component('gameResults', {
        templateUrl: 'admin/game-results/game-results.html',
        controller: ['ResultServiceFactory', '$rootScope', '$routeParams', '$location', function (ResultService, $rootScope, $routeParams, $location) {
            this.getDetails = function (teamResult) {
                if (!$rootScope.presentationMode) {
                    console.log(teamResult.teamId);
                    $location.path(`/games/${$routeParams.gameId}/results/${teamResult.teamId}`);
                }
            };
            ResultService.getParsedResults($routeParams.gameId)
                .then((result) => {
                    this.results = result;
                    console.log(result)
                });


        }]
});