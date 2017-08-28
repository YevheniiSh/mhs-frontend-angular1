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
                        vm.newPhotosUrl = res;
                    });

                    userAuthService.currentUser()
                        .then((res) => {
                            vm.user = res;
                        })
                }

                vm.getPhotoUrl = function () {

                };

                vm.shareURL = $location.absUrl();

                vm.savePhotosUrl = function () {
                    GameService.setPhotosLink(gameId, vm.newPhotosUrl);
                    vm.photosUrl = vm.newPhotosUrl;
                    vm.linkEditor = false;
                };

                vm.editLink = function () {
                    vm.newPhotosUrl = vm.photosUrl;
                    vm.linkEditor = true;
                };

                vm.getTrimmedPhotosUrl= function () {
                    let link = vm.photosUrl;
                    let photosUrlArray = link.split('/');
                    let photosUrlDomain = photosUrlArray[2];
                    let photosUrlPath = photosUrlArray[3];
                    console.log(photosUrlPath);
                    let photosUrlLastCharacters = link.substring(link.length - 6);
                    return photosUrlDomain + "/" + photosUrlPath + "/..." + photosUrlLastCharacters;
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