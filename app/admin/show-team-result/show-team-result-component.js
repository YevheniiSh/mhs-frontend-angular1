angular.module('showTeamResult')
    .component('showTeamResult', {
        templateUrl: 'admin/show-team-result/show-team-result.html',
        controller: ['ResultServiceFactory', 'GameServiceFactory', '$routeParams', '$rootScope', '$location', function (ResultService, GameService, $routeParams, $rootScope, $location) {

            function parseTeamResult(gameResults) {
                return gameResults;
            }

            ResultService.filter({by: 'teamId', val: $routeParams.teamId}, $routeParams.gameId)
                .then((res) => {
                    console.log(res);
                })
        }]

    });