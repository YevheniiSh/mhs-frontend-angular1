angular
    .module('season')
    .component('season',
        {
          templateUrl: 'app/admin/season/season.html',
          css: 'app/admin/season/season.css',
            controller: seasonsController
        });
seasonsController.$inject = ['GameServiceFactory', '$location', 'seasonService', '$routeParams', '$window', 'userAuthService'];

function seasonsController(gameFactory, $location, seasonService, $routeParams, $window, userAuthService) {

    let vm = this;

    let seasonId = $routeParams.seasonId;

    vm.showCloseSeasonAlert = false;

    vm.$onInit = onInit;

    function onInit() {

        seasonService.getSeasonsNames().then((res) => {
            vm.seasons = res;
            setSelectedSeason();
        });

        seasonService.getContenderTeams(seasonId).then((res) => {
            vm.seasonTeams = res;
        });

        seasonService.getDropOutTeams(seasonId).then((res) => {
            vm.seasonDropTeams = res
        });

        seasonService.getCurrentSeason().then(season => {
            if (season) {
                if (season.$id === seasonId) {
                    vm.currentSeason = true;

                    seasonService.hasOpenGames(seasonId).then((res) => {
                        vm.hasOpenGames = res
                    });
                }
            }
        });

        userAuthService.currentUser().then(res => {
            vm.admin = res;
        })
    }
    vm.showAlert = function () {
        if (vm.hasOpenGames) vm.showCloseSeasonError = true;
        else vm.showCloseSeasonAlert = true;
    };

    vm.closeCurrentSeason = function () {
        seasonService.finishSeason(seasonId);
        vm.showCloseSeasonAlert = false;
        vm.currentSeason = false;
    };

    vm.setSeasonUrl = function () {
        if (vm.selectedSeason !== undefined)
            if (seasonId !== vm.selectedSeason.id) {
                seasonId = vm.selectedSeason.id;
                $location.path("seasons/" + seasonId)
            }
    };

    vm.onBack = function () {
        $window.history.back();
    };

    vm.showGame = function (gameId) {
        $location.path("/games/" + gameId + "/results");
    };

    vm.goToTeam = function (id) {
        $location.path(`/teams/${id}`);
    };

    function setSelectedSeason() {
        for (let season  in vm.seasons) {
            if (vm.seasons[season].id === seasonId)
                vm.selectedSeason = vm.seasons[season];
        }
    }
}
