angular.module('gameResultsPage')
    .component('gameResultsPage', {
      templateUrl: 'app/admin/game-results/game-results-page.html',
        controller: [
            'ResultServiceFactory',
            'GameServiceFactory',
            '$routeParams',
            '$rootScope',
            '$location',
            '$window',
            'userAuthService',
            function (ResultService, GameService, $routeParams, $rootScope, $location, $window, auth) {

            let vm = this;
            let gameId = $routeParams.gameId;
            vm.isGameCurrent = true;
            vm.photosURL = '';

                vm.$onInit = onInit;

                vm.teamResults = function () {
                    $window.open($window.location.origin + `/#!/games/${gameId}/results-presentation`, ``, `width=${screen.availWidth},height=${screen.availHeight}`);
                };

                function onInit() {
                    vm.gameId = $routeParams.gameId;

                    GameService.getGameStatus(this.gameId).then(status => {
                        if (status === "current")
                            GameService.getDate(status, this.gameId).then(v => this.date = new Date(v.$value).toLocaleDateString());
                        if (status === "finished")
                            GameService.getDate(status, this.gameId).then(v => this.date = new Date(v.$value).toLocaleDateString())
                    });

                ResultService.getParsedResults(this.gameId)
                    .then((result) => {
                        vm.results = result;
                    });
                GameService.getGameStatus(gameId).then(status => {
                    (status === "finished") ?
                        vm.gameFinished = true : vm.gameFinished = false;
                });

                GameService.getPhotosURL(gameId).then((res) => {
                    vm.photosURL = res;
                });

                auth.currentUser()
                    .then((res) => {
                        vm.user = res;
                    })
            }

                vm.shareURL = $location.absUrl();

            vm.savePhotosLink = function (link) {
                if (link !== undefined) {
                    GameService.setPhotosLink(gameId, link);
                    vm.setLink = false;
                    vm.photosURL = link;
                }
            };

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

                auth.currentUser().then((res) => {
                    vm.auth = true;
                }).catch((err) => {
                    vm.auth = false;
                });
            }]

    });
