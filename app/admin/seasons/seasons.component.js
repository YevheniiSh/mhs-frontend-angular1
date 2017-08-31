angular
    .module('seasons')
    .component('seasons',
        {
            templateUrl: 'admin/seasons/seasons.html',
            css: 'admin/seasons/seasons.css',
            controller: seasonsController
        });
seasonsController.$inject = ['GameServiceFactory', '$location', 'seasonService', '$routeParams', '$window'];

function seasonsController(gameFactory, $location, seasonService, $routeParams, $window) {
    let vm = this;

    let seasonId = $routeParams.seasonId;


    seasonService.getSeasonsNames().then((res) => {
        vm.seasons = res;
        setCurrentSeason();
    });

    seasonService.getParsedSeasonResults(seasonId).then((res) => {
        console.log(res)
        vm.seasonTeams = res
    });

    function setCurrentSeason() {
        for (let season  in vm.seasons) {
            if (vm.seasons[season].id === seasonId)
                vm.selectedSeason = vm.seasons[season]
        }
    }

    vm.setSeasonUrl = function () {
            if (vm.selectedSeason !== undefined)
        if ( seasonId !== vm.selectedSeason.id  )
        {
            seasonId = vm.selectedSeason.id;
            $location.path("seasons/" + seasonId)
        }
    }

}