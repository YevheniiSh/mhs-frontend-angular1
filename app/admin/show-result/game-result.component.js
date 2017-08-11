angular.module('showResult')
    .component('gameResult', {
        templateUrl: 'admin/show-result/game-result.html',
        controller: ['ResultServiceFactory','$routeParams', function (ResultService, $routeParams) {
            ResultService.getParsedResults($routeParams.gameId)
                .then((result) => {
                    this.results = result;
                });
        }]
});