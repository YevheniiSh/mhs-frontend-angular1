angular.module('gameResultsPage')
    .component('gameResultsPage', {
        templateUrl: 'admin/game-results/game-results-page.html',
        controller: [
            'ResultServiceFactory',
            'GameServiceFactory',
            '$routeParams',
            '$rootScope',
            '$location',
            '$window',
            'userAuthService',
            function (ResultService, GameService, $routeParams, $rootScope, $location, $window, userAuthService) {

            let vm = this;
            let gameId = $routeParams.gameId;
            vm.isGameCurrent = true;
            vm.photosUrl = '';

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

                    GameService.getPhotosUrl(gameId).then((res) => {
                        vm.photosUrl = res;
                        vm.setTrimmedPhotosUrl(res);
                    });

                    userAuthService.currentUser()
                        .then((res) => {
                            vm.user = res;
                        })
                }

                vm.shareURL = $location.absUrl();

                vm.savePhotosLink = function () {
                        GameService.setPhotosLink(gameId, vm.photosUrl);
                        vm.setLink = false;
                        vm.setTrimmedPhotosUrl();
                };

                vm.setTrimmedPhotosUrl = function () {
                    let link = vm.photosUrl;
                    let photosUrlDomain = link.split('/')[2];
                    let photosUrlLastCharacters = link.substring(link.length - 3);
                    vm.trimmedPhotosUrl = photosUrlDomain + "..." + photosUrlLastCharacters;
                };

                vm.discardPhotosUrlChanges = function () {

                    vm.setLink = false;
                };

                vm.onBack = function () {
                    userAuthService.currentUser()
                        .then(() => {
                            $location.path(`/games/${gameId}/rounds`);
                        })
                        .catch(() => {
                            $location.path(`/games`);
                    })
                };
            }]

    });