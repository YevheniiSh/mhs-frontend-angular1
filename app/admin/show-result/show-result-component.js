angular.module('showResult')
    .component('showResult', {
        templateUrl: 'admin/show-result/show-result.html',
        controller: ['ResultServiceFactory', 'GameServiceFactory', '$routeParams', '$rootScope', '$location', '$window', function (ResultService, GameService, $routeParams, $rootScope, $location, $window) {


            this.getDetails = function (teamResult) {
                $location.path(`/show-team-result/${$routeParams.gameId}/${teamResult.teamId}`);
            };

            ResultService.getParsedResults($routeParams.gameId)
                .then((result) => {
                    this.results = result;
             });

            this.onBack = function () {
                $location.path(`/round-status/${$routeParams.gameId}`);
            }
        }]

    });