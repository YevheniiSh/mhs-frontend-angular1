angular.module('gameResultsPage')
    .component('gameResultsPage', {
        templateUrl: 'admin/game-results/game-results-page.html',
        controller: ['ResultServiceFactory', 'GameServiceFactory', '$routeParams', '$rootScope', '$location', '$window', 'userAuthService', function (ResultService, GameService, $routeParams, $rootScope, $location, $window, auth) {

            let vm = this;
            let gameId = $routeParams.gameId;
            vm.isGameCurrent = true;

            vm.$onInit = onInit;

            vm.teamResults = function () {
                $window.open($window.location.origin + `/#!/games/${gameId}/results-presentation`, ``, `width=${screen.availWidth},height=${screen.availHeight}`);
            };

            function onInit() {
                ResultService.getParsedResults(gameId)
                    .then((result) => {
                        vm.results = result;
                        console.log(vm.results);
                    });
                GameService.getGameStatus(gameId).then(status => {
                    (status === "finished") ?
                        vm.shareButton = true : vm.shareButton = false;
                });
            }

            vm.shareURL = $location.absUrl();


            vm.onBack = function () {
                auth.currentUser()
                    .then(() => {
                        $location.path(`/games/${gameId}/rounds`);
                    })
                    .catch(() => {
                        $location.path(`/games`);
                    })
                ;
            }
        }]

    });