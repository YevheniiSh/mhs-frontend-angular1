angular
    .module('seasons')
    .component('seasons',
        {
            templateUrl: 'admin/seasons/seasons.html',
            css: 'admin/seasons/seasons.css',
            controller: seasonsController
        });
seasonsController.$inject = ['GameServiceFactory', '$location', 'seasonService', '$routeParams'];

function seasonsController(gameFactory, $location, seasonService, $routeParams) {
    let vm = this;

    vm.seasonId = $routeParams.seasonId;

    seasonService.getSeasonsNames().then((res) => {
        vm.seasons = res
    })
}