angular
    .module('season')
    .component('season',
        {
            templateUrl: 'admin/season/season.html',
            css: 'admin/season/season.css',
            controller: seasonsController
        });
seasonsController.$inject = ['GameServiceFactory', '$location', 'seasonService', '$routeParams', '$window'];

function seasonsController(gameFactory, $location, seasonService, $routeParams, $window) {

    let vm = this;

    let seasonId = $routeParams.seasonId;

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
            console.log(res);
            vm.seasonDropTeams = res
        });

        seasonService.getCurrentSeason()
            .then(season => {
                if (season){
                    let currentSeasonId = season.$id;
                    if (currentSeasonId === seasonId) vm.currentSeason = true;
                }
            });
    }

    vm.closeCurrentSeason = function () {
        seasonService.finishSeason(seasonId);
        vm.currentSeason = false;
    };

    vm.setSeasonUrl = function () {
        if (vm.selectedSeason !== undefined)
            if (seasonId !== vm.selectedSeason.id) {
                seasonId = vm.selectedSeason.id;
                $location.path("season/" + seasonId)
            }
    };

    vm.showGame = function (gameId) {
        $location.path("/games/" + gameId + "/results");
    };

    function setSelectedSeason() {
        for (let season  in vm.seasons) {
            if (vm.seasons[season].id === seasonId)
                vm.selectedSeason = vm.seasons[season];
        }
    }
}